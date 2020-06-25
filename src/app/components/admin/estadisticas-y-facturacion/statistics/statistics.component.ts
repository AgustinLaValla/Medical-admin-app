import { Component, OnDestroy } from '@angular/core';
import { AppState, showStatistics, getSpecialistId, getTurnos, getMiembro, getIsLoading } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadResetTurnoList, loadResetMiembro, loadGetTurnosFromTo, loadGetMiembro, hiddeProgressBar } from 'src/app/store/actions';
import { Turno } from 'src/app/interfaces/turno.interface';
import * as moment from 'moment/moment';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Miembro } from 'src/app/interfaces/miembro.interface';
import Swal from 'sweetalert2';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnDestroy {

  private showStatisticsSubs$ = new Subscription();
  public show: boolean = false;

  private especialistaIdSubs$ = new Subscription();
  public especialistaId: string;

  private turnosSubs$ = new Subscription();
  public turnos: Turno[] = [];
  public totalTurnos: number = 0;

  private getMiembroSubs$ = new Subscription();
  private miembro: Miembro;

  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  public barChart: any;
  public baseChart: any;
  public doughnutChart: any;

  public from: moment.Moment = moment().startOf('month');
  public to: moment.Moment = moment().endOf('month');
  public currentDate = moment().endOf('day');

  constructor(private store: Store<AppState>) {

    this.showStatistics();
    this.getEspecialistaId();
    this.getTurnos();
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
    this.getMiembro();
  };

  ngOnInit(): void { }

  showStatistics() {
    this.showStatisticsSubs$ = this.store.select(showStatistics).subscribe(show => this.show = show);
  };

  getEspecialistaId() {
    this.especialistaIdSubs$ = this.store.select(getSpecialistId).pipe(
      filter(especialistaId => !isNullOrUndefined(especialistaId)),
      map(especialistaId => this.especialistaId = especialistaId),
      tap(() => {
        this.store.dispatch(loadGetMiembro({ id: this.especialistaId }));
        this.store.dispatch(loadGetTurnosFromTo({
          especialistaId: this.especialistaId,
          from: this.from.unix(),
          to: this.to.unix()
        }));
      })
    ).subscribe();
  };

  getTurnos() {
    this.turnosSubs$ = this.store.select(getTurnos).pipe(
      tap(() => this.store.dispatch(hiddeProgressBar())),
      filter(turnos => !isNullOrUndefined(turnos)),
      map(turnos => {
        this.turnos = turnos;
        this.totalTurnos = turnos.length;
        this.getChartsData(turnos);
      })
    ).subscribe();
  };

  getMiembro() {
    this.getMiembroSubs$ = this.store.select(getMiembro).pipe(
      filter(miembro => !isNullOrUndefined(miembro)),
      map(miembro => this.miembro = miembro)
    ).subscribe();
  }

  getChartsData(turnos: Turno[]) {

    const barchartLabels = this.getObrasSociales(turnos);
    const donughnutLabels = this.getMiembroServices(turnos);

    let barChartdata: number[] = [];
    let donughnutCharData: number[] = [];
    let baseChartData: number[] = [];

    barchartLabels.forEach(obra_social => {
      const mutualLength = turnos.filter(turno => turno.obra_social === obra_social).length;
      barChartdata.push(mutualLength);
      baseChartData.push(Number(((mutualLength / this.totalTurnos) * 100).toFixed(2)));
    });

    donughnutLabels.forEach(consulta => {
      const consultaLength = turnos.filter(turno => turno.consulta === consulta).length;
      donughnutCharData.push(consultaLength);
    });


    this.barChart = {
      labels: barchartLabels,
      datasets: [{ data: barChartdata }],
      type: 'bar',
      title: 'Cantidad de turnos por Mutual'
    };
    this.baseChart = {
      labels: barchartLabels,
      data: baseChartData,
      type: 'pie',
      title: 'Promedio de turnos por Mutual'
    }
    this.doughnutChart =
    {
      labels: donughnutLabels,
      data: donughnutCharData,
      type: 'doughnut',
      title: 'Cantidad de turnos por tipo de consulta'
    };

  };

  getObrasSociales(turnos: Turno[]) {
    let obrasSociales: string[] = []
    turnos.map(turno => {
      const mutualExists = obrasSociales.find(mutual => mutual === turno.obra_social);
      if (!mutualExists) {
        obrasSociales.push(turno.obra_social);
      };
    });
    return obrasSociales;
  };


  getMiembroServices(turnos: Turno[]) {
    let consultas: string[] = [];
    turnos.map(turno => {
      const servicioExists = consultas.find(servicio => servicio === turno.consulta);
      if (!servicioExists) {
        consultas.push(turno.consulta);
      };
    });
    return consultas;
  };

  getTurnosFromTo() {
    this.store.dispatch(loadGetTurnosFromTo({
      especialistaId: this.especialistaId,
      from: this.from.startOf('day').unix(),
      to: this.to.endOf('day').unix()
    }));
  };

  async generatePdf() {
    const result = await Swal.fire({
      title: '¿Incluir diagnósticos?',
      text: "Si acepta, los diagnósticos añadidos se incorporarán en los datos",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO INCLUIRLOS!',
      cancelButtonText: 'NO, NO QUIERO INCLUIRLOS'
    });

    let pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.defaultStyle({ bold: false, fontSize: 10 });
    pdf.pageSize('a4');
    pdf.header(new Txt(`${this.miembro.genero === 'Femenino' ? 'Dra.' : 'Dr.'}${this.miembro.apellido} ${this.miembro.nombre}`).margin([40, 20]).end);
    this.generateColumnsData(pdf, result.value);
    pdf.footer((currentPage, pageCount) => {
      return {
        text: currentPage.toString() + ' de ' + pageCount,
        alignment: 'center',
      };
    });
    pdf.create().download();
  };

  generateColumnsData(pdf: PdfMakeWrapper, includeDiagnoses: true | undefined) {
    const obrasSociales = this.getObrasSociales(this.turnos);
    obrasSociales.map((mutual, idx) => {
      let columns: any[] = includeDiagnoses ?
        [['Apellido', 'Nombre', 'DNI', 'Mutual', 'N° Afiliado', 'Fecha de nacimiento', 'Fecha de Turno', 'Consulta', 'Diagnóstico']] :
        [['Apellido', 'Nombre', 'DNI', 'Mutual', 'N° Afiliado', 'Fecha de nacimiento', 'Fecha de Turno', 'Consulta']];
      this.turnos.map(turno => {
        if (turno.obra_social === mutual && includeDiagnoses) {
          columns.push(
            [
              turno.apellido,
              turno.nombre,
              turno.dni,
              turno.obra_social,
              turno.numero_de_afiliado ? turno.numero_de_afiliado : '',
              moment(turno.nacimiento).clone().format('YYYY-MM-DD'),
              moment(turno.desde).utc().clone().format('YYYY-MM-DD hh:mm'),
              turno.consulta,
              turno.diagnostico ? turno.diagnostico : ''
            ]
          );
        } else if (turno.obra_social === mutual && includeDiagnoses === undefined) {
          columns.push(
            [
              turno.apellido,
              turno.nombre,
              turno.dni,
              turno.obra_social,
              turno.numero_de_afiliado ? turno.numero_de_afiliado : '',
              moment(turno.nacimiento).clone().format('YYYY-MM-DD'),
              moment(turno.desde).utc().clone().format('YYYY-MM-DD hh:mm'),
              turno.consulta
            ]
          );
        };
      });
      pdf.add(new Txt(`${mutual}`).alignment('center').bold().fontSize(14).end);
      if (idx < obrasSociales.length - 1) {
        pdf.add(new Table(columns).alignment('center').margin([0, 20, 0, 10]).width('*').pageBreak('after').end);
      } else {
        pdf.add(new Table(columns).alignment('center').margin([0, 20, 0, 10]).width('*').end);
      };
    });
    // return columns;
  }

  ngOnDestroy(): void {
    this.showStatisticsSubs$.unsubscribe();
    this.especialistaIdSubs$.unsubscribe();
    this.turnosSubs$.unsubscribe();
    this.loadingSubs$.unsubscribe();
    this.getMiembroSubs$.unsubscribe();
    this.store.dispatch(loadResetTurnoList());
    this.store.dispatch(loadResetMiembro());
  };

};

