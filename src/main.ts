import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyASju-nt__VTXM_UGvaBpueTQBughjZArk",
    authDomain: "setlisthelper-f3cd5.firebaseapp.com",
    databaseURL: "https://setlisthelper-f3cd5.firebaseio.com",
    storageBucket: "setlisthelper-f3cd5.appspot.com"
  })
]);

