import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-song-edit',
  templateUrl: 'song-edit.component.html',
  styleUrls: ['song-edit.component.css'],
  directives: [ ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES]
})


export class SongEditComponent implements OnInit {
  private sub: any;
  private items: FirebaseListObservable<any[]>;
  public song:any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private af: AngularFire) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id:string = params['songid'];
      let object= this.af.database.object('/songs/' + id);
      object.subscribe(x => {
        this.song = x;
      });

    });
  }

}
