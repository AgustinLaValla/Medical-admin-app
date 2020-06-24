import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getStuff, getIsLoading } from 'src/app/store/app.reducer';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { deactivateLoading, loadGetStuff, loadDeleteMiembro } from 'src/app/store/actions';
import { MatDialog } from '@angular/material';
import { DialogMemberComponent } from './dialog-member/dialog-member.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  private loadingSubs = new Subscription();

  public stuff: Miembro[];
  private stuffSubs = new Subscription();

  constructor(private store: Store<AppState>, private dialog: MatDialog, private alertsSerivice: AlertsService) {
    this.loadingSubs = this.store.select(getIsLoading).subscribe((loading: boolean) => this.loading = loading)
    this.getStuff();
    this.store.dispatch(loadGetStuff())
  }

  ngOnInit() { }

  getStuff() {
    this.stuffSubs = this.store.select(getStuff).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(stuff => !isNullOrUndefined(stuff)),
      map(stuff => this.stuff = stuff)
    ).subscribe();
  }

  openDialog(action: string, id?: string) {
    this.loadingSubs.unsubscribe();
    const dialogRef = this.dialog.open(DialogMemberComponent, {
      data: { action: action, id: id }
    });
    this.loadingSubs = dialogRef.afterClosed().pipe(
      switchMap(() => this.store.select(getIsLoading).pipe(
        map(isLoading => this.loading = isLoading)
      )),
    ).subscribe();
  };

  deleteMiembro(id: string) {
    Swal.fire({
      title: '¿Seguro quieres borrar al miembro del Stuff?',
      text: "¡Al borrar a un miembro del stuff automáticamente se borran sus turnos! ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO BORRARLO!',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(loadDeleteMiembro({ id: id }));
        this.alertsSerivice.showSuccessAlert('Miembro Eliminado ;)', 'El miembro ha sido eliminado del Stuff (¡sus turnos también!)')
      };
    });
  };

  ngOnDestroy(): void {
    this.stuffSubs.unsubscribe();
    this.loadingSubs.unsubscribe();
  }

}
