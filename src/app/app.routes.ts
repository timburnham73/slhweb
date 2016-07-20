import { LoginComponent } from './account/login/login.component';
import { SongsComponent } from './songs/songs.component';


export const AppRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent }
];

