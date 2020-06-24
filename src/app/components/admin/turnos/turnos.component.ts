import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, openTable, getPacientData, getShowTurnosData, getTableType } from 'src/app/store/app.reducer';
import { hidePacientData, loadResetEspecialidad, HideTurnosData, loadResetMiembro, loadResetTurnoList } from 'src/app/store/actions';
import { map, tap, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnDestroy {

  private showTurnosDataSubs$ = new Subscription();
  public showTurnosData: boolean = false;

  private openTableSubs$ = new Subscription();
  public isOpen: boolean = false;

  private showPacientDataSubs$ = new Subscription();
  public showPacientData: boolean;

  private tableTypeSubs$ = new Subscription();
  public tableType: 'Especialistas' | 'Turnos Pasados';

  constructor(private store: Store<AppState>) {
    this.showTurnosDataSelectorsSubscription();
    this.showPacientDataSubscription();
    this.getTableData();
  }

  showTurnosDataSelectorsSubscription() {
    this.showTurnosDataSubs$ = this.store.select(getShowTurnosData).pipe(
      filter(show => !isNullOrUndefined(show)),
      map(show => this.showTurnosData = show),
      filter(show => show),
      tap(() => this.store.dispatch(hidePacientData()))
    ).subscribe();
  };

  showPacientDataSubscription() {

    this.showPacientDataSubs$ = this.store.select(getPacientData).pipe(
      filter(show => !isNullOrUndefined(show)),
      map(show => this.showPacientData = show),
      filter(show => show),
      tap(() => this.store.dispatch(HideTurnosData()))
    ).subscribe();
  };

  getTableData() {
    this.openTableSubs$ = this.store.select(openTable).subscribe(isOpen => this.isOpen = isOpen);

    this.tableTypeSubs$ = this.store.select(getTableType).pipe(
      map((tableType) => this.tableType = tableType),
      filter(tableType => tableType === 'Turnos Pasados'),
      tap(() => this.store.dispatch(hidePacientData()))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.showTurnosDataSubs$.unsubscribe();
    this.showPacientDataSubs$.unsubscribe();
    this.openTableSubs$.unsubscribe();
    this.tableTypeSubs$.unsubscribe();
    this.store.dispatch(loadResetEspecialidad());
    this.store.dispatch(loadResetMiembro());
    this.store.dispatch(loadResetTurnoList());
  }
}
