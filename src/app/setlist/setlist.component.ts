import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../account/auth/auth-service";
import {Observable} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'app-setlist',
  templateUrl: 'setlist.component.html',
  styleUrls: ['setlist.component.css']
})
export class SetlistComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  setlists: Observable<any[]>;

  constructor(public af: AngularFire, auth: AuthService) {
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
          //setlist.songs = af.database.object(`/songs/${setlist.$key}`);
          for(var i = 1; i <= setlist.songs.length; i++) {
            console.log(setlist);
          }
          return setlist;
        })
      });
  }


  ngOnInit() {
  }

}
