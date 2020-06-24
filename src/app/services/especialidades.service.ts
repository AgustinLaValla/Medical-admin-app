import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Especialidad } from '../interfaces/especialidad.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { activateLoading } from '../store/actions';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public especialidadesCollection: AngularFirestoreCollection;
  public docId: string;
  public serviciosArray:string[] = []

  constructor(private afs:AngularFirestore, private store:Store<AppState>) {
    this.especialidadesCollection = this.afs.collection<Especialidad>('especialidades');
   }


  //ESPECIALIDAD FUNCTIONS
  getEspecialidades(): Observable<Especialidad[]> { 
    this.store.dispatch( activateLoading() )
    return this.afs.collection<Especialidad>('especialidades').snapshotChanges().pipe(
      map((action)=> action.map(snap => {
        const especialidad = snap.payload.doc.data() as Especialidad;
        especialidad.id = snap.payload.doc.id;
        return {...especialidad};
      }))
    )
  }

  getEspecialidad(id:string): Observable<Especialidad> { 
    this.store.dispatch( activateLoading() )
    return this.especialidadesCollection.doc<Especialidad>(id).valueChanges()
  }

  addEspecialidad(newEspecialidad: Especialidad){ 

     this.especialidadesCollection.add(newEspecialidad).then((docRef) => {
      this.docId = docRef.id;
      this.especialidadesCollection.doc(this.docId).update({
        id: this.docId
      })
    });
    return this.docId;
  }

  updateEspecialidad() { }

  deleteEspecialidad (id:string) { 
    return this.especialidadesCollection.doc(id).delete()
  }

  //SERVICIOS FUNCTION
  addNewServicio(id:string, value:string) { 
    return this.especialidadesCollection.doc(id).update({
      servicios: firebase.firestore.FieldValue.arrayUnion(value)
    })
  }

  deleteServicio(id:string, value:string) { 
    return this.especialidadesCollection.doc(id).update({
      servicios:firebase.firestore.FieldValue.arrayRemove(value)
    });
  }

  updateSerivico (id:string, newValue:string, oldValue:string): string[] { 
       this.especialidadesCollection.doc(id).get().subscribe((docRef) => {
        this.serviciosArray = docRef.data().servicios.slice();
        for(let i = 0; i < this.serviciosArray.length; i ++) {
          if(this.serviciosArray[i] == oldValue) {
            this.serviciosArray[i] = newValue;
          }
        }
        this.especialidadesCollection.doc(id).update({
          servicios: this.serviciosArray
        })
      })
      return this.serviciosArray;
  }

  getEspecialidadByItsName(nombreEspecialidad:string):Observable<Especialidad[]> { 
    return this.afs.collection<Especialidad>('especialidades', ref => ref.where('nombreEspecialidad', '==', nombreEspecialidad))
                   .valueChanges();
  }
}

