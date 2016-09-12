import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {AuthService} from "../account/auth/auth-service";
import {ActivatedRoute} from "@angular/router";
declare var _:any;

@Component({
  moduleId: module.id,
  selector: 'app-setlist-songs',
  templateUrl: 'setlist-songs.component.html',
  styleUrls: ['setlist-songs.component.css']
})
export class SetlistSongsComponent implements OnInit {
  showSongs: Boolean;
  items: FirebaseListObservable<any[]>;
  setlist: Observable<any[]>;
  songs: Observable<any[]>;
  private uid:string;

  private sub: any;

  constructor(private route: ActivatedRoute, public af: AngularFire, private auth: AuthService) {
    this.af = af;
    this.auth = auth;
    this.af.auth.subscribe(response => {
      this.uid = response.uid;
    });

  }

  ngOnInit() {

    this.showSongs = false;

    this.sub = this.route.params.subscribe(params => {
      let id:string = params['setlistid'];
      this.setlist = this.af.database.object('/setlists/' + id)
        .map((setlist) => {
          var songCounter = 0;
          setlist.songItems = [];
          for(var key in setlist.songs) {
            var song = setlist.songs[key];
            var songId = song.songId;
            setlist.songItems.push(
              {
                displaySequenceNumber: song.displaySequenceNumber,
                sequenceNumber: song.sequenceNumber,
                songDetails: this.af.database.object(`/songs/${songId}`)
              }) ;
            songCounter++;
          }
          setlist.songItems = _.sortBy(setlist.songItems, 'sequenceNumber');
          setlist.setlistSongsLength = songCounter;
          return setlist;
      });
    });


    //Get the list of songs
    const path = `/songs`;
    this.songs = this.af.database.list(path,{
      query:{
        orderByChild: 'name'
      }
    })
      .map((songs) => {
        return songs.filter(song => song.uid === this.auth.id).map((song) =>{
          song.artist = this.af.database.object(`/artist/${song.artistId}`);
          return song;
        })
      });
  }

}
