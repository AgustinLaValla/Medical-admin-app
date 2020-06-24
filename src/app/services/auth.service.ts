import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { setAuthenticated, setUnAuthenticated, activateLoading } from '../store/actions';
import { Router } from '@angular/router';
import { UiService } from './ui.service';
import * as firebase from 'firebase';
import { AlertsService } from './alerts.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private auth: AngularFireAuth,
        private store: Store<AppState>,
        private router: Router,
        private uiService: UiService,
        private alertsService: AlertsService) { }

    initAuthListener() {
        this.auth.authState.subscribe((user) => {
            if (user) {
                this.detectNetWorkConnection();
                this.store.dispatch(setAuthenticated());
                this.router.navigate(['/']);
            } else {
                this.store.dispatch(setUnAuthenticated());
                this.router.navigate(['/login']);
            };
        });
    };

    logIn(email: string, password: string) {
        this.auth.auth.signInWithEmailAndPassword(email, password).then(() => {
            this.store.dispatch(activateLoading());
        }).catch((error) => this.uiService.showSnackBar(error.message, null, 5000));
    };

    detectNetWorkConnection() {
        setTimeout(() => {
            firebase.firestore().collection('detect-connection').doc('vK3NM49G5UVfTVmeFC1b').get().catch(() => {
                this.alertsService.showWarningService('Problemas de Conexión', 'Algo ha ocurrido. Por favor, corrobore su conección a internet');
            });
        },2500);
    }

    logout() {
        this.auth.auth.signOut();
    };

}