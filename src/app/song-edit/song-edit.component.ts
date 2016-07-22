import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";

@Component({
  moduleId: module.id,
  selector: 'app-song-edit',
  templateUrl: 'song-edit.component.html',
  styleUrls: ['song-edit.component.css'],
  directives: [ ROUTER_DIRECTIVES]
})


export class SongEditComponent implements OnInit {
  private sub: any;
  private items: FirebaseListObservable<any[]>;
  private song:any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private af: AngularFire) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id:string = params['songid'];
      this.song = this.af.database.object('/songs/' + id);
      this.song.subscribe(x => {
        console.log(x);
      });

    });
  }

}
