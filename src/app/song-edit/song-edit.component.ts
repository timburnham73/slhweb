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
  private isNew:boolean;
  private songs: FirebaseListObservable<any[]>;
  public song:any;
  private uid:string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private af: AngularFire) {
    this.af.auth.subscribe(response => {
      this.uid = response.uid;
    });
  }

  ngOnInit() {
    this.isNew = false;
      this.song = {
          name: '',
          'key':'',
          'length':''
      };
    this.songs = this.af.database.list('/songs');
    this.sub = this.route.params.subscribe(params => {
      let id:string = params['songid'];
      this.song = this.af.database.object('/songs/' + id);
      this.isNew = id === 'new'? true:false;


    });
  }

  save(name:string, length:string, key:string){
    if(this.isNew === true){
      this.songs.push({name:name,length:length,key:key, uid:this.uid});
    }
    else
    {
      this.song.update({name:name,length:length,key:key});
    }

    this.router.navigate(['/songs']);
  }



}
