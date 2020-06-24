import { Component, OnInit, Input } from '@angular/core';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { MatDialog } from '@angular/material';
import { PacientdataDialogComponent } from './pacientdata-dialog/pacientdata-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadDeletePacient, hidePacientData, deactivateLoading } from 'src/app/store/actions';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-pacient-info',
  templateUrl: './pacient-info.component.html',
  styleUrls: ['./pacient-info.component.css']
})
export class PacientInfoComponent implements OnInit {

  @Input() public pacient:Pacient;

  constructor(private dialog:MatDialog, private store:Store<AppState>, private alertsService:AlertsService) { 
    this.store.dispatch(deactivateLoading());
  }

  ngOnInit() {
  }

  openDialog() { 
    this.dialog.open(PacientdataDialogComponent, {
      data: {pacientInfo: this.pacient}
    })
  }

  deletePacient() { 
    
    Swal.fire({
      title: '¿Seguro quieres al paciente de la lista?',
      text: "¡Los datos eliminados no se pueden recuperar! ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#6a0080',
      confirmButtonText: '¡SÍ, QUIERO BORRARLO!',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch( loadDeletePacient({ paciente: this.pacient }) );
        this.store.dispatch( hidePacientData() );
        this.alertsService.showSuccessAlert('Pacient eliminado ;)','Los datos del paciente han sido permanentemente eliminados')
      };
    });
  };


}
