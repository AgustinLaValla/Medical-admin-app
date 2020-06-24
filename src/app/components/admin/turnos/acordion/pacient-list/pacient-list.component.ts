import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getPacientsCounter } from 'src/app/store/app.reducer';
import { Subject, combineLatest, Subscription } from 'rxjs';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { loadGetPacients, showPacientData, loadGetPacientByLastname, hidePacientData, loadResetPacientList, unsubscribeLoading } from 'src/app/store/actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit, OnDestroy {

  @Input() public pacientList: Pacient[];
  @Input() public count:number;

  public startAt = new Subject();
  public endAt = new Subject();

  private pacientsCounterSubs$ = new Subscription();
  public pacientsCounter:number;
  
  constructor(private store:Store<AppState>) {
    this.pacientsCounterSubs$ = this.store.select(getPacientsCounter).subscribe((pacientsCounter:number) => {
      if(pacientsCounter) { 
        this.pacientsCounter = pacientsCounter;
      }else {
        this.pacientsCounter = 0;
      }
    })
   }

  ngOnInit() { }

  openPacientTable(pacienteId:string) { 
    this.store.dispatch( showPacientData({pacientId:pacienteId}) ); 
    this.store.dispatch( unsubscribeLoading() );
  }


  applyFilter(event: KeyboardEvent) { 
    const query = (event.target as HTMLInputElement).value;
    const { keyCode } = event;
    const keyCodeQuery = keyCode != 16 && keyCode != 17 && keyCode != 20 && keyCode != 18 && keyCode != 91 && keyCode != 93 && 220;

    console.log(event.target['value']);

    if (query != '' && keyCodeQuery) {   
      this.startAt.next(query);
      this.endAt.next(query + '\uf8ff');
      combineLatest(this.startAt, this.endAt).pipe(take(1)).subscribe((value) => {
        this.store.dispatch(loadGetPacientByLastname({
          startValue: value[0],
          endValue: value[1]
        }))
      })
    }else if(query == '' && keyCodeQuery) {
      this.store.dispatch(loadGetPacients({count:this.count}));
      this.store.dispatch(hidePacientData());
    }
  }

  loadMorePacients() { 
    this.count += 5;
    this.store.dispatch( loadGetPacients({count:this.count}) );
  }

  ngOnDestroy(): void { 
    this.store.dispatch( loadResetPacientList() );
    this.pacientsCounterSubs$.unsubscribe();
  }

}
