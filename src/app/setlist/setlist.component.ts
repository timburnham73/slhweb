import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../account/auth/auth-service";
import {Observable} from "rxjs";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-setlist',
  templateUrl: 'setlist.component.html',
  styleUrls: ['setlist.component.css']
})
export class SetlistComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  setlists: Observable<any[]>;

  constructor(public af: AngularFire, auth: AuthService, private router: Router) {
      const path = `/setlists`;
      this.items = af.database.list(path);
      //console.log('lodash version:', _.VERSION);
      this.setlists = af.database.list(path,{
        query:{
          orderByChild: 'name'
        }
      })
        .map((setlists) => {
          return setlists.filter(setlist => setlist.uid === auth.id).map((setlist) =>{
            for(var key in setlist.songs) {
              var songId = setlist.songs[key].songId;
              setlist.songs[key].song = af.database.object(`/songs/${songId}`);
            }

          return setlist;
        })
      });
  }


  ngOnInit() {
  }

  onRowClick(setlist){
    this.router.navigate(['/setlist', setlist.$key]);
  }

}
