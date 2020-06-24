import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mutual } from '../interfaces/mutual.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { loadAddMutualSuccess, loadAddMiembroFailed, loadUpdateMutualSuccess, loadUpdateMutualFailed, loadDeleteMutualSuccess, loadDeleteMutualFailed, activateLoading, loadAddMutualFailed } from '../store/actions';

@Injectable({ providedIn: 'root' })
export class MutualesService {

    private mutualesCollection: AngularFirestoreCollection<Mutual>

    constructor(private afs: AngularFirestore, private store: Store<AppState>) {
        this.mutualesCollection = this.afs.collection('mutuales');
    };

    getMutuales(): Observable<Mutual[]> {
        this.store.dispatch(activateLoading());
        return this.mutualesCollection.snapshotChanges().pipe(map(action => action.map(snap => {
            const mutual = snap.payload.doc.data() as Mutual;
            mutual.id = snap.payload.doc.id;
            return mutual;
        })));
    };

    async addMutual(mutual: Mutual) {
        const newMutual = await this.mutualesCollection.add(mutual);
        await this.mutualesCollection.doc(newMutual.id).update({ id: newMutual.id });
    };

    async updateMutual(mutual: Mutual) {
        try {
            await this.mutualesCollection.doc(mutual.id).update(mutual);
        } catch (error) {
            this.store.dispatch(loadUpdateMutualFailed(error));
        };
    };

    async deleteMutual(mutualId: string) {
        try {
            await this.mutualesCollection.doc(mutualId).delete();
            this.store.dispatch(loadDeleteMutualSuccess({ mutualId }));
        } catch (error) {
            this.store.dispatch(loadDeleteMutualFailed(error));
        };
    };

};