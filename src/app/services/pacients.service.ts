import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Turno } from '../interfaces/turno.interface';
import { Pacient } from '../interfaces/pacient.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { activateLoading, loadUpdateSinglePacientInfoSuccess, loadResetPacientStoreData, hidePacientData } from '../store/actions';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { PacientCounter } from '../interfaces/counter.interface';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class PacientsService {

  private pacientsColl: AngularFirestoreCollection<Pacient>;

  private currentDate: number;

  constructor(private afs: AngularFirestore, private store: Store<AppState>, private alertService:AlertsService) {
    this.pacientsColl = this.afs.collection<Pacient>('pacientes');
    this.currentDate = moment().startOf('day').unix();
  }

  async addPacient(turno: Turno) {
    
    const snap = await  this.pacientsColl.doc<Pacient>(turno.dni).get().toPromise();
    if (!snap.exists) {
      this.pacientsColl.doc(turno.dni).set({
        nombre: turno.nombre,
        apellido: turno.apellido,
        id: turno.dni,
        nacimiento: turno.nacimiento,
        nacimiento_seconds: turno.nacimiento_seconds,
        obra_social: turno.obra_social,
        telefono: turno.telefono,
        numero_de_afiliado: turno.numero_de_afiliado ? turno.numero_de_afiliado : null
      });
      await this.incrementOrDecrementPacientCounter('increment');
    };
    this.store.dispatch(loadResetPacientStoreData());
  };


  getPacientsColl(counter: number): Observable<Pacient[]> {
    return this.afs.collection<Pacient>('pacientes', ref => ref.orderBy('apellido', 'asc')
      .limit(counter))
      .valueChanges();
  };

  async incrementOrDecrementPacientCounter(action: 'increment' | 'decrement') {
    const docRef = await this.pacientsColl.doc('-- Pacient Counter --').get().toPromise();
    if (!docRef.exists) {
      await this.pacientsColl.doc('-- Pacient Counter --').set({
        pacient_counter: 0
      });
    };
    if (action == 'increment') {
      await this.pacientsColl.doc('-- Pacient Counter --').update({
        pacient_counter: firebase.firestore.FieldValue.increment(1)
      });
    } else if (action == 'decrement') {
      await this.pacientsColl.doc('-- Pacient Counter --').update({
        pacient_counter: firebase.firestore.FieldValue.increment(-1)
      });
    };


  };

  getPacientsCounter() {
    return this.pacientsColl.doc<PacientCounter>('-- Pacient Counter --').valueChanges();
  };

  getSinglePacient(pacientId: string): Observable<Pacient> {
    return this.pacientsColl.doc<Pacient>(pacientId).valueChanges();
  };

  async updatePacient(oldPacientData: Pacient, newPacientData: Pacient) {

    if (oldPacientData.id != newPacientData.id) {
      const docRef = await this.pacientsColl.doc(newPacientData.id).get().toPromise();

      if (docRef.exists) {
        return this.alertService.showErrorAlert('Error!', `Ya existe un usuario con el DNI: ${newPacientData.id}`);
      } else {

        let turnosBackUp: Turno[] = [];

        const turnos = await this.afs.collection('turnos').ref.where('dni', '==', oldPacientData.id).get();
        if (!turnos.empty) {

          turnos.docs.forEach(turno => turnosBackUp.push(turno.data() as Turno));

          const batch = this.afs.firestore.batch();
          turnos.docs.forEach(doc => batch.delete(doc.ref));

          const pacientDoc = await this.pacientsColl.doc(oldPacientData.id).get().toPromise();
          batch.delete(pacientDoc.ref);

          await this.pacientsColl.doc(newPacientData.id).set(newPacientData);

          turnosBackUp.forEach((turno) => {
            turno.dni = newPacientData.id;
            batch.set(firebase.firestore().collection('turnos').doc(turno.id), turno);
          });

          await batch.commit();
        
          this.alertService.showSuccessAlert('Datos Actualizados', 'La información del paciente se ha actualizado correctamente');

          this.store.dispatch(loadResetPacientStoreData());
          this.store.dispatch(hidePacientData());

        };
      };
    }
    else {
      await this.pacientsColl.doc(oldPacientData.id).update(newPacientData);
      this.alertService.showSuccessAlert('Datos Actualizados', 'La información del paciente se ha actualizado correctamente');
      this.store.dispatch(loadUpdateSinglePacientInfoSuccess({ newPacientData: newPacientData }));
      this.store.dispatch(loadResetPacientStoreData());
      this.store.dispatch(hidePacientData());
    };
  };

  deletePacient(pacient: Pacient) {
    const { id } = pacient;
    this.pacientsColl.doc(id).delete().then(() => this.incrementOrDecrementPacientCounter('decrement'));
  }


  async comparePacientInfoAndUpdate(turno: Turno) {
    const { dni } = turno;
    const pacient: Pacient = await this.pacientsColl.doc(dni).get().toPromise();
    if (pacient.apellido !== turno.apellido || pacient.nombre !== turno.nombre || pacient.obra_social !== turno.obra_social ||
      pacient.numero_de_afiliado !== turno.numero_de_afiliado || pacient.telefono !== turno.telefono ||
      pacient.nacimiento !== turno.nacimiento || pacient.nacimiento_seconds !== turno.nacimiento_seconds) {
      this.pacientsColl.doc(dni).set({
        nombre: turno.nombre,
        apellido: turno.apellido,
        id: turno.dni,
        nacimiento: turno.nacimiento,
        nacimiento_seconds: turno.nacimiento_seconds,
        obra_social: turno.obra_social,
        telefono: turno.telefono,
        numero_de_afiliado: turno.numero_de_afiliado ? turno.numero_de_afiliado : null
      });
    };
  };


  getPacienteTurnos(pacienteId: string) {
    this.store.dispatch(activateLoading()); 
    return this.afs.collection('turnos', ref => ref.where('dni', '==', pacienteId)
                                                   .orderBy('dateInSeconds', 'asc'))
                                                   .valueChanges();
  };

  getPacientByLastname(startValue: any, endValue: any) {
    return this.afs.collection<Pacient>('pacientes', ref => ref.orderBy('apellido')
      .startAt(startValue)
      .endAt(endValue))
      .valueChanges();
  };

  getPacientByDNI(dni: string) {
    return this.afs.collection<Pacient>('pacientes', ref => ref.where('id', '==', dni)).valueChanges();
  };

}
