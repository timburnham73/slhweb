import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app/app.routes';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import { AppComponent, environment } from './app/';
import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  provideRouter(AppRoutes),
  defaultFirebase({
    apiKey: "AIzaSyASju-nt__VTXM_UGvaBpueTQBughjZArk",
    authDomain: "setlisthelper-f3cd5.firebaseapp.com",
    databaseURL: "https://setlisthelper-f3cd5.firebaseio.com",
    storageBucket: "setlisthelper-f3cd5.appspot.com"
  }),
  firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password
  }),
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS
]);

