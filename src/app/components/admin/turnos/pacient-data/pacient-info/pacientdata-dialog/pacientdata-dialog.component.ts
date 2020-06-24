import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { Store } from '@ngrx/store';
import { AppState, getMutuales } from 'src/app/store/app.reducer';
import { loadUpdateSinglePacientInfo,  loadGetMutuales } from 'src/app/store/actions';
import * as moment from 'moment';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pacientdata-dialog',
  templateUrl: './pacientdata-dialog.component.html',
  styleUrls: ['./pacientdata-dialog.component.css']
})
export class PacientdataDialogComponent implements OnInit, OnDestroy {

  public pacient: Pacient;
  public pacientBackUp: Pacient;
  public nacimiento: moment.Moment;

  public maxDate = moment();

  private mutualesSubs$ = new Subscription();
  public mutuales: Mutual[] = [];

  constructor(public dialogRef: MatDialogRef<PacientdataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pacientInfo: Pacient },
    private store: Store<AppState>) {
      this.store.dispatch(loadGetMutuales());
  }

  ngOnInit() {
    const { pacientInfo } = this.data;
    this.pacientBackUp = { ...pacientInfo };
    this.pacient = pacientInfo;
    this.nacimiento = moment(pacientInfo.nacimiento).utc().clone();
    this.mutualesSubs$ = this.store.select(getMutuales).subscribe(mutuales => {
      if (mutuales) this.mutuales = mutuales;
    });
  };

  chosenYearHandler(year: moment.Moment) {
    this.nacimiento = moment().year(year.year());
  };

  chosenMonthHandler(month: moment.Moment) {
    console.log(month);
    this.nacimiento = moment(this.pacient.nacimiento).month(month.month());
  };


  saveChanges() {
    if (JSON.stringify(this.pacient) != JSON.stringify(this.pacientBackUp)) {

      this.store.dispatch(loadUpdateSinglePacientInfo({
        oldPacientData: this.pacientBackUp,
        newPacientData: this.pacient
      }));
      

    };
    this.dialogRef.close();
  };

  checkFechaDeNacimiento() {
    const { pacientInfo } = this.data;
    console.log(moment(this.nacimiento).utc().unix() == pacientInfo.nacimiento_seconds)
    if (moment(this.nacimiento).utc().unix() != pacientInfo.nacimiento_seconds) {
      this.pacient.nacimiento = this.nacimiento.toString();
      this.pacient.nacimiento_seconds = moment(this.nacimiento).clone().unix();
    };
  };

  ngOnDestroy(): void {
    this.mutualesSubs$.unsubscribe();
  };

};
