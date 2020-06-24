import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Store } from '@ngrx/store';
import { AppState, getTurnos, getIsLoading, getId, getCounter, getTurnosCounter, getTurnosConcretadosLength, getTableType, getMiembro, getUnsubsLoading, getIsFiltering } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import {
  deactivateLoading, loadGetTurnos, loadDeleteSingleTurno, loadCloseTable, loadGetTurnosCounter, loadGetTurnoByPacientLastname,
  loadGetTurnosConcretadosLength,
  loadResetTurnoList,
  loadGetTurnosPasados,
  loadGetMiembro,
} from 'src/app/store/actions';
import { TurnosDialogComponent } from '../turnos-dialog/turnos-dialog.component';
import Swal from 'sweetalert2';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-turnos-table',
  templateUrl: './turnos-table.component.html',
  styleUrls: ['./turnos-table.component.css']
})
export class TurnosTableComponent implements OnInit, OnDestroy {

  private idSubs$ = new Subscription();
  private especialistaId: string;

  private tableTypeSubs$ = new Subscription();
  public tableType: 'Especialistas' | 'Turnos Pasados';

  private turnosSubs$ = new Subscription();
  public turnos: Turno[] = [];

  private counterSubs$ = new Subscription();
  private counter: number;


  private totalTurnos: number;
  public turnosConcretadosLength: number;

  private loadingSubs$ = new Subscription();
  private loadingSubsHandler$ = new Subscription();
  public loading: boolean = false;

  private miembroSubs$ = new Subscription();
  public miembro: Miembro;

  public displayedColumns: string[] = ['apellido_y_nombre', 'fecha', 'desde', 'hasta', 'consulta', 'obra_social', 'opciones'];
  public dataSource = new MatTableDataSource<Turno>();
  // @ViewChild(MatSort, { static: true }) public sort: MatSort;
  @ViewChild('tableScroll', { static: true }) public tableScroll: ElementRef

  public backgroundLayer: boolean = false;

  private isFilteringSubs$ = new Subscription();
  public isFiltering: boolean = false;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private alertsService:AlertsService) {
    this.initTable();
  }

  initTable() {
    // SUBCRIPTIONS
    this.tableTypeSubscription();

    this.counterSubs$ = this.store.select(getCounter).subscribe((counter: number) => this.counter = counter);
    this.getEspecialistaIdAndDispatchTurnosAction();
    this.getTurnos();
    this.isFilteringSubs$ = this.store.select(getIsFiltering).subscribe((isFiltering) => this.isFiltering = isFiltering);
    this.miembroSubs$ = this.store.select(getMiembro).subscribe((miembro: Miembro) => this.miembro = miembro);
    this.loadingSubscriptionHandler();
  };

  ngOnInit() { }

  tableTypeSubscription() {
    this.tableTypeSubs$ = this.store.select(getTableType).pipe(
      filter(tableType => !isNullOrUndefined(tableType)),
      map(tableType => this.tableType = tableType),
      switchMap(() => this.store.select(getTurnosConcretadosLength).pipe(
        filter(turnosConcretadosLength => turnosConcretadosLength >= 0),
        map((turnosConcretadosLength) => this.turnosConcretadosLength = turnosConcretadosLength),
      )),
      switchMap(() => this.store.select(getTurnosCounter).pipe(
        filter(totalTurnos => !isNullOrUndefined(totalTurnos)),
        map((totalTurnos) => {
          if (totalTurnos && this.tableType == 'Especialistas') {
            this.totalTurnos = totalTurnos - this.turnosConcretadosLength;
          } else if (totalTurnos && this.tableType == 'Turnos Pasados') {
            this.totalTurnos = this.turnosConcretadosLength;
          };
        })
      ))

    ).subscribe();
  }

  getTurnos() {

    this.turnosSubs$ = this.store.select(getTurnos).pipe(
      tap((turnos) => {
        this.store.dispatch(deactivateLoading());
        if (isNullOrUndefined(turnos) || turnos.length == 0) {
          this.store.dispatch(loadGetMiembro({ id: this.especialistaId }));
        };
      }),
      filter((turnos => !isNullOrUndefined(turnos))),
      map((turnos) => {
        this.store.dispatch(loadGetTurnosConcretadosLength({ especialistaId: this.especialistaId }));
        this.store.dispatch(loadGetTurnosCounter({ especialistaId: this.especialistaId }));
        this.turnos = turnos;
        this.dataSource.data = this.turnos;
      })
    ).subscribe()
  };

  getEspecialistaIdAndDispatchTurnosAction() {
    this.idSubs$ = this.store.select(getId).pipe(
      filter(id => !isNullOrUndefined(id)),
      tap((id) => {
        if (this.tableType == 'Especialistas') {
          this.store.dispatch(loadGetTurnos({ id: id, counter: this.counter }));
        } else if (this.tableType == 'Turnos Pasados') {
          this.store.dispatch(loadGetTurnosPasados({ especialistaId: id, counter: this.counter }));
        };
      }),
      map(id => this.especialistaId = id)
    ).subscribe();
  };

  getLoadingSubs() {
    this.loadingSubs$ = this.store.select(getIsLoading).pipe(
      tap((loading) => this.loading = loading),
      filter((loading) => !loading),
      map(() => this.backgroundLayer = false)
    ).subscribe();
  };

  loadingSubscriptionHandler() {
    this.loadingSubsHandler$ = this.store.select(getUnsubsLoading).subscribe(unsubscribe => {
      if (unsubscribe) {
        this.loadingSubs$.unsubscribe()
      } else {
        this.getLoadingSubs();
      };
    });
  }

  openDialog(action: string, turno: Turno = null) {
    this.dialog.open(TurnosDialogComponent, {
      data: { action: action, especialistaId: this.especialistaId, turno: turno }
    })
  }

  applyFilter(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value;
    const { keyCode } = event;
    const keyCodeQuery = keyCode != 16 && keyCode != 17 && keyCode != 20 && keyCode != 18 && keyCode != 91 && keyCode != 93 && 220;

    if (query != '' && keyCodeQuery) {
      this.isFiltering = true;
      this.store.dispatch(loadGetTurnoByPacientLastname({
        especialistaId: this.especialistaId,
        startValue: query,
        endValue: query + '\uf8ff',
        tableType: this.tableType
      }))
    } else if (query == '' && keyCodeQuery) {
      if (this.tableType == 'Especialistas') {
        this.store.dispatch(loadGetTurnos({ id: this.especialistaId, counter: this.counter }));
      } else {
        this.store.dispatch(loadGetTurnosPasados({ especialistaId: this.especialistaId, counter: this.counter }));
      };
    };
  };

  async deleteTurno(turno: Turno) {

    const result = await Swal.fire({
      title: '¿Seguro quieres borrar el turno?',
      text: "¡Los datos eliminados no se pueden recuperar! ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO BORRARLO!',
      cancelButtonText: 'CANCELAR'
    });
    if (result.value) {
      await this.store.dispatch(loadDeleteSingleTurno({
        especialistaId: this.especialistaId,
        turno: turno
      }));
      this.alertsService.showSuccessAlert('Turno eliminado ;)','El turno ha sido eliminado de la lista')
      await this.getEspecialistaIdAndDispatchTurnosAction();
    }
  }


  scrollHandler(event) {
    console.table([this.totalTurnos, this.counter])
    if (event == 'bottom' && this.counter < this.totalTurnos) {
      this.counter += 5;
      if (this.tableType == 'Especialistas') {
        this.store.dispatch(loadGetTurnos({ id: this.especialistaId, counter: this.counter }))
      } else {
        this.store.dispatch(loadGetTurnosPasados({ especialistaId: this.especialistaId, counter: this.counter }))
      }
      this.backgroundLayer = true;
    };
  };


  ngOnDestroy(): void {
    this.turnosSubs$.unsubscribe();
    this.loadingSubs$.unsubscribe();
    this.idSubs$.unsubscribe();
    this.counterSubs$.unsubscribe();
    this.tableTypeSubs$.unsubscribe();
    this.miembroSubs$.unsubscribe();
    this.isFilteringSubs$.unsubscribe();
    this.loadingSubsHandler$.unsubscribe();
    this.store.dispatch(loadCloseTable());
    this.store.dispatch(loadResetTurnoList());
  }

}