import { LoginComponent } from './account/login/login.component';
import { SongsComponent } from './songs/songs.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import {AuthGuard} from './account/auth/auth-guard';
import {SetlistComponent} from "./setlist/setlist.component";
import {SetlistSongsComponent} from "./setlist-songs/setlist-songs.component";

export const AppRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent, canActivate: [AuthGuard] },
  { path: 'setlists', component: SetlistComponent, canActivate: [AuthGuard] },
  { path: 'setlist/:setlistid', component: SetlistSongsComponent, canActivate: [AuthGuard] },
  { path: 'songedit/:songid', component: SongEditComponent, canActivate: [AuthGuard]}
];

