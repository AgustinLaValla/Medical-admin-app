import { Component, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getStuff, getIsLoading, getTableType, showStatistics } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { loadGetStuff, deactivateLoading, loadOpenTable, loadGetEspecialidadByItsName, loadCloseTable, ShowTurnosData, unsubscribeLoading, HideTurnosData, loadShowStatistics } from 'src/app/store/actions';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { tap, map, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-especialistas-list',
  templateUrl: './especialistas-list.component.html',
  styleUrls: ['./especialistas-list.component.css']
})
export class EspecialistasListComponent implements  OnDestroy {

  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  private stuffSubs$ = new Subscription();
  public stuff: Miembro[];

  private tableTypeSubs$ = new Subscription();
  private tableType: 'Especialistas' | 'Turnos Pasados';

  private unsubscribeLoadingSubs$ = new Subscription();

  @Input() headerDescription: string;

  constructor(private store: Store<AppState>) {
    //SUBSCRIPTIONS
    this.getStuff();
    this.getTableType();
    this.getLoadingSubs();
    this.loadingSubscriptionHandler();
    //DISPATCHS
    this.store.dispatch(loadGetStuff());
  };


  getStuff() {
    this.stuffSubs$ = this.store.select(getStuff).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      map((stuff) => this.stuff = (stuff) ? stuff : null)
    ).subscribe();
  };

  getTableType() {
    if (this.headerDescription === 'Especialistas' || this.headerDescription === 'Turnos Pasados') {
      this.tableTypeSubs$ = this.store.select(getTableType).pipe(
        filter(tableType => !isNullOrUndefined(tableType)),
        map(tableType => this.tableType = tableType)
      ).subscribe();
    };
  };

  loadingSubscriptionHandler() {
    this.unsubscribeLoadingSubs$ = this.store.select(unsubscribeLoading).subscribe(unsubscribe => {
      if (unsubscribe) {
        this.loadingSubs$.unsubscribe();
      } else {
        this.getLoadingSubs();
      };
    });
  };

  showTurnos(especialista: Miembro) {
    this.loadingSubs$.unsubscribe();


    if (this.headerDescription === 'Especialistas') {
      this.store.dispatch(ShowTurnosData({ especialistaId: especialista.id }));
      if (this.tableType === 'Turnos Pasados') {
        this.store.dispatch(loadCloseTable());
      };


    } else if (this.headerDescription === 'Turnos Pasados') {
      this.store.dispatch(HideTurnosData());
      if (this.tableType == 'Especialistas') {
        this.store.dispatch(loadCloseTable());
      };
      setTimeout(() => {
        this.store.dispatch(loadOpenTable({ especialistaId: especialista.id, tableType: 'Turnos Pasados', counter: 15 }));
      }, 50);
    } else if(this.headerDescription === 'Estadisticas') { 
      this.store.dispatch(loadShowStatistics({especialistaId:especialista.id}));
    };
    this.store.dispatch(loadGetEspecialidadByItsName({ nombreEspeciliadad: especialista.especialidad }));
  };

  getLoadingSubs() {
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe((loading: boolean) => this.loading = loading);
  };

  ngOnDestroy(): void {
    this.stuffSubs$.unsubscribe();
    this.tableTypeSubs$.unsubscribe()
    // this.loadingSubs$.unsubscribe();
    this.unsubscribeLoadingSubs$.unsubscribe();
  };

};