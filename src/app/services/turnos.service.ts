import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Turno } from '../interfaces/turno.interface';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { activateLoading, loadIncrementCounter, loadCloseDialog, deactivateLoading, loadResetPacientStoreData, showProgressBar, isNoFiltering, loadDeleteSingleTurnoFailed, loadUpdatePacientSuccess, loadUpdateSingleTurnoSuccess } from '../store/actions';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Counter } from '../interfaces/counter.interface';
import Swal from 'sweetalert2';
import { PacientsService } from './pacients.service';
import { AlertsService } from './alerts.service';

@Injectable({ providedIn: 'root' })
export class TurnosService {

    private stuffColl: AngularFirestoreCollection;
    private turnosColl: AngularFirestoreCollection;

    private currentDate:number;

    private currentMonth:number;
    private currentEndMonth:number;

    constructor(private afs: AngularFirestore, 
                private store:Store<AppState>, 
                private pacientsService:PacientsService,
                private alertsService:AlertsService
                ) {

        this.stuffColl = this.afs.collection('stuff');
        this.turnosColl = this.afs.collection('turnos');

        this.currentDate = moment().startOf('day').unix();

        this.currentMonth = moment().startOf('month').unix();
        this.currentEndMonth = moment().endOf('month').unix();

    }

    
    getMiembroTurnos(especialistaId:string, count:number = 15) { 
        this.store.dispatch( activateLoading() );
        if(count === 0) count = 15;
        return this.afs.collection('turnos', ref =>   
                             ref.where('especialistaId', '==', especialistaId)
                                .where('dateInSeconds', '>=', this.currentDate)
                                .orderBy('dateInSeconds', 'asc')
                                .limit(count))
                                .snapshotChanges()
                                .pipe(map(action => action.map(snap => {
                                              const turno = snap.payload.doc.data() as Turno;
                                              turno.id = snap.payload.doc.id;
                                              return {...turno}
                                        })
                                ));
        

    }

    getSingleTurno(especialistaId:string, turnoId:string) { 
       return this.turnosColl.doc(turnoId).valueChanges();
    };

    async addTurno(especialistaId:string, turno:Turno) {
        this.store.dispatch(activateLoading()); 
        const snap = await this.turnosColl.ref.where('especialistaId', '==', especialistaId)
                                              .where('dateInSeconds', '==', turno.dateInSeconds)
                                              .get();

        if(snap.empty) {

            // this.store.dispatch(activateLoading());
            this.store.dispatch(loadCloseDialog({close:true}));
            this.store.dispatch(  loadIncrementCounter({value:1}) );
            const docRef = await this.turnosColl.add(turno);
            await this.turnosColl.doc(docRef.id).update({id:docRef.id});
            await this.stuffColl.doc(especialistaId).collection('turnos').doc(docRef.id).set({id:docRef.id});
            await this.pacientsService.addPacient(turno);
            await this.turnosDocumentCounter(especialistaId, 'increment');
            
        } else {
            
            const turnoTime:moment.Moment = moment(snap.docs[0].data().desde);
            this.alertsService.showWarningService('¡Ese turno está ocupado!',
            `${snap.docs[0].data().nombre} ${snap.docs[0].data().apellido}: ${turnoTime.utc().format('YYYY-MM-DD LT')}`);

            this.store.dispatch(loadCloseDialog({close:false}));
            this.store.dispatch(deactivateLoading());
        };
    };


    async updateTurno(especialistaId:string, turno:Turno) { 

        this.store.dispatch(activateLoading()); 
        const snap = await this.turnosColl.ref.where('especialistaId', '==', especialistaId)
                                              .where('dateInSeconds', '==', turno.dateInSeconds)
                                              .get();
        if(snap.empty) { 
            await this.turnosColl.doc(turno.id).update(turno);
            await this.pacientsService.comparePacientInfoAndUpdate(turno);
            this.store.dispatch(loadCloseDialog({close:true}));
            this.store.dispatch(loadUpdateSingleTurnoSuccess({turno}));
        } else { 
            if(JSON.stringify(snap.docs[0].data()) != JSON.stringify(turno) && snap.docs[0].data().id == turno.id ) { 
                await this.turnosColl.doc(turno.id).update(turno);
                await this.pacientsService.comparePacientInfoAndUpdate(turno);
                this.store.dispatch(loadCloseDialog({close:true}));
                this.store.dispatch(loadUpdateSingleTurnoSuccess({turno}));
            } else if(JSON.stringify(snap.docs[0].data()) != JSON.stringify(turno) &&
                        snap.docs[0].data().dateInSeconds == turno.dateInSeconds) { 
                            const turnoTime:moment.Moment = moment(snap.docs[0].data().desde);
                            this.alertsService.showWarningService('¡Ese turno está ocupado!',
                            `${snap.docs[0].data().nombre} ${snap.docs[0].data().apellido}: ${turnoTime.utc().format('YYYY-MM-DD LT')}`
                            );
                            this.store.dispatch(loadCloseDialog({close:false}));
                            this.store.dispatch(deactivateLoading());
                      };
        };
    };

    //delete Single Turno
    async deleteSingleTurno(especialistaId:string ,turno:Turno) {
        try {
            await this.turnosColl.doc(turno.id).delete();
            await this.turnosDocumentCounter(especialistaId, 'decrement');
            await this.stuffColl.doc(especialistaId).collection('turnos').doc(turno.id).delete();            
        } catch (error) {
            this.store.dispatch(loadDeleteSingleTurnoFailed({error}));
        }
    };

    //TURNOS COUNTER
    async turnosDocumentCounter(especialistaId:string, action:'increment' | 'decrement') { 
        const counterRef = this.stuffColl.doc(especialistaId).collection<Counter>('turnos-counter');
        const docRef = await counterRef.get().toPromise();
        if(docRef.empty){
           await counterRef.doc('--counter--').set({
                counter: 0
            });
        };

        if(action == 'increment') { 
            await counterRef.doc('--counter--').update({
                counter: firebase.firestore.FieldValue.increment(1)
            });
        }else{
            await counterRef.doc('--counter--').update({
                counter: firebase.firestore.FieldValue.increment(-1)
            });
        };
        
    };
    //GET TURNOS COUNTER VALUE
    getTurnosCounterValue(especialistaId:string):Observable<Counter> { 
        const counterRef = this.stuffColl.doc(especialistaId).collection('turnos-counter').doc<Counter>('--counter--');
        return counterRef.valueChanges();
    };

    //GET TURNOS CONCRETADOS LENGTH
    getTurnosConcretadosLength(especialistaId:string) { 
        return this.afs.collection('turnos', ref => ref.where('especialistaId', '==', especialistaId)
                                                       .where('dateInSeconds' , '<', this.currentDate))
                                                       .valueChanges()
    };

    //Search Turno By Pacient Name
    GetTurnoByPacientLastName(especialistaId:string,startValue:any, endValue:any, tableType: 'Especialistas' | 'Turnos Pasados') { 
       return this.afs.collection('turnos', ref => ref.where('especialistaId', '==', especialistaId)
                                                        .orderBy('apellido')
                                                        .startAt(startValue)
                                                        .endAt(endValue))
                                                        .valueChanges()
                                                        .pipe(map((turnos:Turno[])=> { 
                                                            if(tableType == 'Especialistas') { 
                                                                return turnos.filter((turno:Turno) => turno.dateInSeconds >= this.currentDate);
                                                            }else if(tableType == 'Turnos Pasados') { 
                                                                return turnos.filter((turno:Turno) => turno.dateInSeconds < this.currentDate)
                                                            };
                                                        }));
    };

    getOldTurnos(especialistaId:string, count:number) { 
        this.store.dispatch(activateLoading());
        return this.afs.collection('turnos', ref => ref.where('especialistaId', '==', especialistaId)
                                                        .where('dateInSeconds', '<', this.currentDate)
                                                        .orderBy('dateInSeconds', 'asc')
                                                        .limit(count))
                                                        .snapshotChanges()
                                                        .pipe(map(action => action.map(snap => {
                                                                const turno = snap.payload.doc.data() as Turno;
                                                                turno.id = snap.payload.doc.id;
                                                                return {...turno}
                                                            }))
                                                        );
    };


    getTurnosFromTo(especialistaId:string,from:number = this.currentMonth, to:number = this.currentEndMonth) { 
        this.store.dispatch(showProgressBar());
        return this.afs.collection('turnos', ref => ref.where('especialistaId', '==', especialistaId)
                                                        .where('dateInSeconds', '>=', from)
                                                        .where('dateInSeconds', '<=', to)
                                                        .orderBy('dateInSeconds', 'asc'))
                                                        .snapshotChanges().pipe(map(action => action.map(snap => {
                                                            const turno = snap.payload.doc.data() as Turno;
                                                            turno.id = snap.payload.doc.id;
                                                            return turno;
                                                            })
                                                        ));
    };

};

