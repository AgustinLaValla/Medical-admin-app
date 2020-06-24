import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getIsLoading, getPacienteTurnos } from 'src/app/store/app.reducer';
import { Turno } from 'src/app/interfaces/turno.interface';
import { deactivateLoading, loadDeleteTurnoFromPacientSection } from 'src/app/store/actions';
import { TurnosDialogComponent } from '../../turnos-dialog/turnos-dialog.component';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { filter, tap, map } from 'rxjs/operators';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-pacient-table',
  templateUrl: './pacient-table.component.html',
  styleUrls: ['./pacient-table.component.css']
})
export class PacientTableComponent implements OnInit, OnDestroy {

  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  private pacientTurnosSubs$ = new Subscription();

  public currentDate:number;

  dataSource = new MatTableDataSource<Turno>();
  displayedColumns: string[] = ['especialista', 'consulta', 'fecha' ,'desde', 'hasta', 'estado' ,'opciones']

  @ViewChild('tableScroll', { static: true }) public tableScroll: ElementRef

  constructor(private store:Store<AppState>, private dialog:MatDialog, private alertsService:AlertsService) {

    this.loadingSubs$ = this.store.select( getIsLoading ).subscribe((isLoading:boolean) => this.loading = isLoading );

    this.getPacientTurnos();

    this.currentDate = moment().startOf('day').unix();

   }

  ngOnInit() {
  }

  getPacientTurnos() {
    this.pacientTurnosSubs$ = this.store.select(getPacienteTurnos).pipe(
      tap(() => this.store.dispatch(  deactivateLoading())),
      filter(turnos => !isNullOrUndefined(turnos)),
      map(turnos => this.dataSource.data = turnos)
    ).subscribe()
  }

  openDialog(action: string, turno: Turno) {
    this.dialog.open(TurnosDialogComponent, {
      data: { action: action, especialistaId: turno.especialistaId, turno: turno, fromPacientTable:true }
    }); 
  };

  deletePacient(turno:Turno) { 
    const {especialistaId} = turno;

    Swal.fire({
      title: '¿Seguro quieres borrar el turno?',
      text: "¡Los datos eliminados no se pueden recuperar! ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO BORRARLO!',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch( loadDeleteTurnoFromPacientSection({especialistaId:especialistaId, turno:turno}) );
        this.alertsService.showSuccessAlert('Turno eliminado ;)', 'El turno ha sido eliminado de la lista');
      };
    });
  };

  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
    this.pacientTurnosSubs$.unsubscribe();
  }
}
