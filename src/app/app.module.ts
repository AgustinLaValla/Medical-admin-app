//ANGULAR MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth';
//MATERIAL
import { MaterialModule } from './material/material.module';
//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.reducer';
import { effectsArray } from './store/effects';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(effectsArray),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: environment.production }),
    HttpClientModule

  ],
  providers: [
    {provide: StorageBucket, useValue:'consultorio-ayacucho-app.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
