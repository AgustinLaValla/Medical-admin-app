import { Component, OnInit, OnDestroy } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { MatDialog } from '@angular/material';
import { DialogServicesComponent } from './dialog-services/dialog-services.component';
import { Store } from '@ngrx/store';
import { AppState, getEspecialidades, getIsLoading } from 'src/app/store/app.reducer';
import { loadDeleteEspecialidad, loadGetEspecialidades, deactivateLoading } from 'src/app/store/actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit, OnDestroy {

  public especialidadesSubs$ = new Subscription();
  public especialidades: Especialidad[] = [];

  public loadingSubs$ = new Subscription();
  public loading: boolean = false;


  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private matIconRegistry: MatIconRegistry,
    private domSanatizer: DomSanitizer,
    private alertsService: AlertsService
  ) {

    this.setCustomMedicalIcons();
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe((loading: boolean) => this.loading = loading);
    this.getEspecialidades();

    this.store.dispatch(loadGetEspecialidades());
  }

  ngOnInit() { }

  getEspecialidades() {
    this.especialidadesSubs$ = this.store.select(getEspecialidades).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(especialidades => !isNullOrUndefined(especialidades)),
      map(especialidades => this.especialidades = especialidades)
    ).subscribe()
  };

  openDialog(message: string, id?: string) {
    this.loadingSubs$.unsubscribe();
    const dialogRef = this.dialog.open(DialogServicesComponent, {
      // height: '600px',
      data: { message: message, id: id }
    });

    this.loadingSubs$ = dialogRef.afterClosed().pipe(
      switchMap(() => this.store.select(getIsLoading).pipe(
        map(loading => this.loading = loading)
      ))
    ).subscribe();

  };

  deleteEspecialidad(id: string) {

    Swal.fire({
      title: '¿Seguro quieres borrar la especialidad?',
      text: "¡Los datos eliminados no se recuperan jamás! :o",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO BORRARLA!',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(loadDeleteEspecialidad({ id: id }));
        this.alertsService.showSuccessAlert('Especialidad borrada!', 'La especialidad ha sido borrada. :)');
      };
    });
  };

  setCustomMedicalIcons() {
    this.matIconRegistry.addSvgIcon('medical_bag', this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/medical_bag.svg'))
    this.matIconRegistry.addSvgIcon('health', this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/health.svg'))
  };

  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
    this.especialidadesSubs$.unsubscribe();
  };

}
