import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseRef, AuthProviders} from "angularfire2/angularfire2";
import {ChordProParser} from "./ChordProParser";
declare var _:any;

@Component({
  moduleId: module.id,
  selector: 'app-song-lyric',
  templateUrl: 'song-lyric.component.html',
  styleUrls: ['song-lyric.component.css']
})
export class SongLyricComponent implements OnInit {
  public song:any;
  private sub: any;
  private uid:string;
  public parsedSong: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private af: AngularFire) {
    this.af.auth.subscribe(response => {
      this.uid = response.uid;
    });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      let id:string = params['songid'];
      this.song = this.af.database.object('/songs/' + id);
      this.song.subscribe(song => {
        console.log(song);
        if(_.size(song.lyrics) > 0) {

          var  parser =  new ChordProParser(song.lyrics);
          this.parsedSong = parser.parseChordPro();
        }
      });
    });
  }

}
