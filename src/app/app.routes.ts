import { LoginComponent } from './account/login/login.component';
import { SongsComponent } from './songs/songs.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import {AuthGuard} from './account/auth/auth-guard';

export const AppRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent, canActivate: [AuthGuard] },
  { path: 'songedit/:songid', component: SongEditComponent, canActivate: [AuthGuard]}
];

