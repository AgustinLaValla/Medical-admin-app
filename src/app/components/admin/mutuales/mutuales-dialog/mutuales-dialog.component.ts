import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState, getIsLoading } from 'src/app/store/app.reducer';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { Subscription } from 'rxjs';
import { loadAddMutual, loadUpdateMutual } from 'src/app/store/actions';

@Component({
  selector: 'app-mutuales-dialog',
  templateUrl: './mutuales-dialog.component.html',
  styleUrls: ['./mutuales-dialog.component.css']
})
export class MutualesDialogComponent implements OnInit, OnDestroy {

  public mutual: Mutual = { nombre: '' };


  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MutualesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: 'Editar Mutual' | 'Agregar Mutual', mutual?: Mutual },
    private store: Store<AppState>
  ) {
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
  }

  ngOnInit() {
    this.initMutual();
  };

  initMutual() {
    if (this.data.mutual) {
      this.mutual = this.data.mutual;
    };
  };

  addMutual() {
    this.store.dispatch(loadAddMutual({ mutual: {...this.mutual} }));
    setTimeout(() => {
      this.mutual.nombre = '';
      this.mutual.id = null;
    },500);
  };

  updateMutual() {
    this.store.dispatch(loadUpdateMutual({mutual:{...this.mutual}}));
    this.dialogRef.close();
    setTimeout(() => {
      this.mutual.nombre = '';
      this.mutual.id = null;
    },500);
  };

  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
  };
}
