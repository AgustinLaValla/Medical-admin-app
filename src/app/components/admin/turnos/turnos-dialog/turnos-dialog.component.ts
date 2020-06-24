import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { AppState, getEspecialidad, getMiembro, getPacient, getCloseDialog, getIsLoading } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Turno } from 'src/app/interfaces/turno.interface';
import * as moment from 'moment';
import {
  loadResetTurno, loadGetMiembro, loadAddTurno, loadUpdateSingleTurno, loadGetEspecialidadByItsName,
  loadResetMiembro, loadGetPacientByDNI, loadResetPacientStoreData, loadCloseDialog, deactivateLoading, unsubscribeLoading, subscribeLoading
} from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import Swal from 'sweetalert2';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-turnos-dialog',
  templateUrl: './turnos-dialog.component.html',
  styleUrls: ['./turnos-dialog.component.css']
})

export class TurnosDialogComponent implements OnInit, OnDestroy {

  private turnoSubs$ = new Subscription();
  public new_turno: Turno = {
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: null,
    nacimiento_seconds: 0,
    consulta: '',
    desde: null,
    hasta: null,
    especialista: '',
    obra_social: '',
    numero_de_afiliado: '',
    telefono: '',
    id: '',
    dateInSeconds: 0,
    especialistaId: ''
  };
  private especialidadSubs$ = new Subscription();
  public servicios: string[];

  private miemboSubs$ = new Subscription();
  public miembro: Miembro;

  private loadingSubs$ = new Subscription();
  public loading: boolean;

  private dialogCloseSubs$ = new Subscription();

  private pacientSubs$ = new Subscription();

  public fecha: moment.Moment;
  public fecha_edit_mode: Date
  public desde_hora: string;
  public hasta_hora: string;
  public nacimiento: moment.Moment;

  public minDate: Date;
  public maxDate = moment();

  public diagnostico: string;

  constructor(
    public dialogRef: MatDialogRef<TurnosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, especialistaId: string, turno: Turno, fromPacientTable?: boolean },
    private store: Store<AppState>) {
    this.new_turno.especialistaId = this.data.especialistaId;
    this.store.dispatch(unsubscribeLoading());
    this.initDialog();
  }

  initDialog() {
    //SUBSCRIPTIONS
    if (this.data.turno) {
      this.new_turno = { ...this.data.turno };
      this.diagnostico = this.data.turno.diagnostico;
      this.getTurnoTime(this.data.turno.desde, this.data.turno.hasta);
    }

    this.especialidadSubs$ = this.store.select(getEspecialidad).pipe(
      filter((especialidad) => !isNullOrUndefined(especialidad)),
      map((especialidad) => this.servicios = especialidad.servicios)
    ).subscribe();


    this.miemboSubs$ = this.store.select(getMiembro).pipe(
      filter(miembro => !isNullOrUndefined(miembro)),
      map((miembro) => this.miembro = miembro),
      map(() => this.new_turno.especialista = `${this.miembro.apellido} ${this.miembro.nombre}`),
      tap(() => {
        if (this.data.fromPacientTable) {
          this.store.dispatch(loadGetEspecialidadByItsName({ nombreEspeciliadad: this.miembro.especialidad }));
        };
      })
    ).subscribe();

    this.pacientSubs$ = this.store.select(getPacient).pipe(
      filter(pacient => !isNullOrUndefined(pacient)),
      map((pacient) => {
        const { nombre, apellido, id, obra_social, nacimiento, /*nacimiento_seconds*/ } = pacient;
        if (nombre && apellido && id && obra_social && nacimiento /*&& nacimiento_seconds*/) {
          this.new_turno.nombre = pacient.nombre;
          this.new_turno.apellido = pacient.apellido;
          this.new_turno.dni = pacient.id;
          this.nacimiento = moment(pacient.nacimiento).utc().clone();
          this.new_turno.obra_social = pacient.obra_social;
          this.new_turno.telefono = (pacient.telefono) ? pacient.telefono : '';
          this.new_turno.nacimiento_seconds = pacient.nacimiento_seconds ? pacient.nacimiento_seconds : moment(pacient.nacimiento).clone().unix();
          this.new_turno.numero_de_afiliado = pacient.numero_de_afiliado ? pacient.numero_de_afiliado : '';
        }
      })
    ).subscribe();

    this.dialogCloseSubs$ = this.store.select(getCloseDialog).pipe(
      filter(close => !isNullOrUndefined(close)),
      tap(close => {
        if (close) {
          this.dialogRef.close();
          this.resetTurno();
          this.store.dispatch(subscribeLoading());
          this.store.dispatch(deactivateLoading());
          this.store.dispatch(loadCloseDialog({ close: false }));
        };  
      })
    ).subscribe();

    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
  };

  ngOnInit() {
    const { especialistaId, turno } = this.data;
    this.store.dispatch(loadGetMiembro({ id: especialistaId }));

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);

  }

  showDetails() {

    let fecha_desde: moment.Moment;
    let fecha_hasta: moment.Moment;

    const desde_fullHour = this.desde_hora.replace(':', '');
    const desdeHour = parseInt(desde_fullHour.substr(0, 2));
    const desdeMinutes = parseInt(desde_fullHour.substr(2, 2));

    const hasta_fullHour = this.hasta_hora.replace(':', '');
    const hastaHour = parseInt(hasta_fullHour.substr(0, 2));
    const hastaMinutes = parseInt(hasta_fullHour.substr(2, 2));

    if (this.data.action == 'Editar Turno') {
      fecha_desde = this.fecha.clone().utc().hour(desdeHour).minutes(desdeMinutes);
      fecha_hasta = this.fecha.clone().utc().hour(hastaHour).minutes(hastaMinutes);

    } else {
      fecha_desde = this.fecha.clone().hour(desdeHour).minutes(desdeMinutes);
      fecha_hasta = this.fecha.clone().hour(hastaHour).minutes(hastaMinutes);
    }

    this.new_turno.desde = fecha_desde.toString();
    this.new_turno.hasta = fecha_hasta.toString();


    if (this.compare(fecha_desde, fecha_hasta)) return;

    const { especialistaId } = this.data;

    if (this.data.action == 'Agregar Turno') {

      this.new_turno.dateInSeconds = this.fecha.clone().utc().hour(desdeHour).minutes(desdeMinutes).unix();
      this.new_turno.nacimiento = this.nacimiento.clone().utc().toString();
      this.new_turno.nacimiento_seconds = moment(this.nacimiento).clone().unix();
      this.store.dispatch(loadAddTurno({
        especialistaId: especialistaId,
        turno: this.new_turno
      }));

    } else {
      if (this.data.action === 'Añadir Diagnóstico') {
        this.new_turno.diagnostico = this.diagnostico;
      };
      this.new_turno.dateInSeconds = this.fecha.clone().utc().hour(desdeHour).minutes(desdeMinutes).unix();
      this.checkFechaDeNacimiento();
      if (JSON.stringify(this.new_turno) === JSON.stringify(this.data.turno)) return this.dialogRef.close();
      this.new_turno.numero_de_afiliado = this.new_turno.obra_social !== 'Particular' ? this.new_turno.numero_de_afiliado : null;
      this.store.dispatch(loadUpdateSingleTurno({
        especialistaId: especialistaId,
        turno: this.new_turno
      }));
    };

  };

  getTurnoTime(desde, hasta) {

    this.fecha = moment(desde).clone();
    this.nacimiento = moment(this.new_turno.nacimiento).utc().clone();

    const dateDesde = moment(desde).clone();
    const dateHasta = moment(hasta).clone();

    const hour_desde = (dateDesde.utc().utc().clone().hour() < 10) ? `0${dateDesde.utc().clone().hour()}` : `${dateDesde.utc().clone().hour()}`;
    const minutes_desde = (dateDesde.clone().minutes() < 10) ? `0${dateDesde.clone().minutes()}` : `${dateDesde.clone().minutes()}`;
    const hour_hasta = (dateHasta.utc().clone().hour() < 10) ? `0${dateHasta.utc().clone().hour()}` : `${dateHasta.utc().clone().hour()}`;
    const minutes_hasta = (dateHasta.clone().minutes() < 10) ? `0${dateHasta.clone().minutes()}` : `${dateHasta.clone().minutes()}`;

    this.desde_hora = `${hour_desde}:${minutes_desde}`;
    this.hasta_hora = `${hour_hasta}:${minutes_hasta}`;
  };

  //Check Fecha De Nacimiento
  checkFechaDeNacimiento() {
    const { nacimiento_seconds } = this.new_turno
    if (moment(this.nacimiento).utc().unix() != nacimiento_seconds) {
      this.new_turno.nacimiento_seconds = moment(this.nacimiento).clone().unix();
      this.new_turno.nacimiento = moment(this.nacimiento).clone().toString();
    }
  }



  compare(hora_desde: moment.Moment, hora_hasta: moment.Moment) {

    if (moment(hora_desde).clone().unix() >= moment(hora_hasta).clone().unix()) {
      Swal.fire({
        icon: 'error',
        title: '<strong>Error de <u>horarios</u></strong>',
        html: `<span><strong>¡La hora de inicio debe ser mayor a la hora de cierre!</strong></span><br>
               <u>Hora de Inicio:</u> ${hora_desde.format('LT')}<br> 
               <u>Hora de cierre:</u> ${hora_hasta.format('LT')}<br>`,
        confirmButtonText: 'Ok!',
        confirmButtonColor: '#e91e63'
      });
      return true;
    } else {
      return false
    };
  };

  chosenYearHandler(year: moment.Moment) {
    this.nacimiento = moment().year(year.year());
  };

  chosenMonthHandler(month: moment.Moment) {
    this.nacimiento = this.nacimiento.month(month.month())
  };


  //set Date by keyboard
  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  checkDNI(dni: string) {
    const pattern = /^[0-9]{8}$/;
    if (dni.length === 8 && pattern.test(dni)) {
      this.store.dispatch(loadGetPacientByDNI({ dni }))
    }
  };

  resetTurno() {
    this.new_turno = {
      nombre: '',
      apellido: '',
      dni: '',
      nacimiento: null,
      nacimiento_seconds: 0,
      consulta: '',
      desde: null,
      hasta: null,
      especialista: '',
      obra_social: '',
      numero_de_afiliado: '',
      telefono: '',
      id: '',
      dateInSeconds: 0,
      especialistaId: ''
    };
  }


  ngOnDestroy(): void {
    this.turnoSubs$.unsubscribe();
    this.especialidadSubs$.unsubscribe();
    this.miemboSubs$.unsubscribe();
    this.pacientSubs$.unsubscribe();
    this.dialogCloseSubs$.unsubscribe();
    this.store.dispatch(loadCloseDialog({ close: false }));
    this.store.dispatch(subscribeLoading());
    this.store.dispatch(loadResetTurno());
    this.store.dispatch(loadResetMiembro());
    this.store.dispatch(loadResetPacientStoreData());
  }




}

