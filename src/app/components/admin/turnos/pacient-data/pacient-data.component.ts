import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, open_pacient_table, getPacientDataId, getPacient } from 'src/app/store/app.reducer';
import { loadCloseTable, loadGetPacientTurnos, loadGetSinglePacient, loadResetPacientStoreData, loadResetPacientTurnoStore, hidePacientData, subscribeLoading } from 'src/app/store/actions';
import { openPacientTable, closePacientTable } from 'src/app/store/actions/pacient-table.actions';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-pacient-data',
  templateUrl: './pacient-data.component.html',
  styleUrls: ['./pacient-data.component.css']
})
export class PacientDataComponent implements OnInit, OnDestroy {

  private pacientIdSubs$ = new Subscription();
  public pacientId:string;

  private pacientTableSubs$ = new Subscription();
  public openPacientTable:boolean = false;

  private pacientSubs$ = new Subscription();
  public pacient:Pacient;

  tabIndex:any = 0;

  constructor(private store:Store<AppState>) { 

    this.getPacientId();

    this.getPacientTable();

    this.getPacient();

   }

  ngOnInit() {
    this.openTableOrShowPacientData();
  }

  getPacientId() { 
    this.pacientIdSubs$ = this.store.select(getPacientDataId).pipe(
      filter((pacientId) => !isNullOrUndefined(pacientId)),
      map(pacientId => this.pacientId = pacientId),
      tap((pacientId) => {
        this.store.dispatch( loadGetSinglePacient({pacientId:pacientId}) );
        this.store.dispatch( loadGetPacientTurnos({pacientId:this.pacientId}) );
      })
    ).subscribe();
  }

  getPacientTable() { 
    this.pacientTableSubs$ = this.store.select(open_pacient_table).pipe(
      filter(open => !isNullOrUndefined(open)),
      map(open => this.openPacientTable = open),
      filter(open => open),
      tap(() => this.store.dispatch( loadCloseTable() ))
    ).subscribe()
  };

  getPacient() { 
    this.pacientSubs$ = this.store.select( getPacient ).pipe(
      filter(pacient => !isNullOrUndefined(pacient)),
      map(pacient => this.pacient = pacient)
    ).subscribe();
  };

  openTableOrShowPacientData() { 
    if(this.tabIndex == 0) { 
      this.store.dispatch( openPacientTable() );
    }else { 
      this.store.dispatch( closePacientTable() );
    };
  }


  ngOnDestroy(): void {
    this.pacientTableSubs$.unsubscribe();
    this.pacientIdSubs$.unsubscribe();
    this.pacientSubs$.unsubscribe();
    this.store.dispatch( loadResetPacientStoreData() );
    this.store.dispatch( loadResetPacientTurnoStore() );
    this.store.dispatch( hidePacientData() );
    this.store.dispatch( subscribeLoading() );
  }
}
