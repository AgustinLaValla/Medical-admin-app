import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getMutuales, getIsLoading } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { deactivateLoading, loadGetMutuales, loadDeleteMutual } from 'src/app/store/actions';
import { MatDialog } from '@angular/material';
import { MutualesDialogComponent } from './mutuales-dialog/mutuales-dialog.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-mutuales',
  templateUrl: './mutuales.component.html',
  styleUrls: ['./mutuales.component.css']
})
export class MutualesComponent implements OnInit, OnDestroy {

  private loadingSubs$ = new Subscription();
  public loading:boolean = false;

  private mutualesSubs$ = new Subscription();
  public mutuales: Mutual[] = [];

  constructor(
    private store:Store<AppState>, 
    private dialog:MatDialog,
    private domSanitizer:DomSanitizer,
    private matIconRegistry: MatIconRegistry
    ) {
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
    this.getMutuales();
    this.matIconRegistry.addSvgIcon('medical_tag',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/medical-tag.svg'));
   }

  ngOnInit() {
    this.store.dispatch(loadGetMutuales());
  }

  getMutuales() { 
    this.mutualesSubs$ = this.store.select(getMutuales).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(mutuales => !isNullOrUndefined(mutuales)),
      map(mutuales => this.mutuales = mutuales)
    ).subscribe();
  };

  openDialog(message:string, mutual?:Mutual) {
    this.loadingSubs$.unsubscribe();

    const dialogRef = this.dialog.open(MutualesDialogComponent , {
      data: {message:message, mutual}
    });

    this.loadingSubs$ = dialogRef.afterClosed().pipe(
      switchMap(() => this.store.select(getIsLoading)),
      map((loading) => this.loading = loading)
    ).subscribe();
   };

   deleteMutual(mutualId:string) { 
     this.store.dispatch(loadDeleteMutual({mutualId}));
   };


  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
    this.mutualesSubs$.unsubscribe();
  }

}
