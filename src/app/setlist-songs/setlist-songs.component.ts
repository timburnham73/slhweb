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
  songIds: Array<any>;
  setlistId: string;
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
      this.setlistId = params['setlistid'];

      this.setlist = this.af.database.object('/setlists/' + this.setlistId)
        .map((setlist) => {
          var songCounter = 0;
          setlist.songItems = [];
          for(var key in setlist.songs) {
            var song = setlist.songs[key];
            var songId = song.songId;
            setlist.songItems.push(
              {
                $key:key,
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

    this.refreshSongs();
  }

  refreshSongs(){
    //Get the setlist songs then filter the song by them.
    this.af.database.object(`/setlists/` + this.setlistId + `/songs` )
      .subscribe(songs => {
        this.songIds = [];
        var songsExist = !(songs.hasOwnProperty('$value') && !songs['$value']);
        if(songsExist) {
          for (var key in songs) {
            this.songIds.push(songs[key].songId);
          }
        }
      });

    this.songs = this.af.database.list(`/songs`,{
      query:{
        orderByChild: 'name'
      }
    })
      .map((songs) => {
        return songs.filter(song => song.uid === this.auth.id && !_.includes(this.songIds, song.$key))
          .map((song) =>{
          song.artist = this.af.database.object(`/artist/${song.artistId}`);
          return song;
        })
      });


  }

  addSongToSetlist(song) {
    var sequenceNumber = 1;

    var subsciption = this.af.database.object(`/setlists/` + this.setlistId + `/songs` ).subscribe(songs => {
        if(songs.hasOwnProperty('$value') && !songs['$value']) {
          sequenceNumber = 1;
        }
        else{
          for (var key in songs) {
            if (songs[key].sequenceNumber >= sequenceNumber) {
              sequenceNumber = songs[key].sequenceNumber+1;
            }
          }
        }
      });
    subsciption.unsubscribe();

    this.af.database
      .list(`/setlists/` + this.setlistId + `/songs` )
      .push({
        displaySequenceNumber: sequenceNumber,
        sequenceNumber: sequenceNumber,
        songId: song.$key
    });

    this.refreshSongs();
  }

  reorderSetlistSongs(){

    /*this.af.database
      .list('/setlists/' + this.setlistId + '/songs')
      .push(
        {
          displaySequenceNumber: 3,
          sequenceNumber: 3,
          songId: '-KMWylCNF5cfMi2Kpimw'
        });*/

    var songs = this.af.database.object('/setlists/' + this.setlistId + '/songs', { preserveSnapshot: true });
    var setlistSongs = [];
    //get the snapshot of the setlist songs and insert the new setlist song.
    var subscription = songs.subscribe(snapshot => {
      console.log(snapshot.key);
      var snapShotSongs = snapshot.val();

      for(var key in snapShotSongs){
        var setlistSong = snapShotSongs[key];
        setlistSong.key = key;
        setlistSongs.push (setlistSong);
      }

      setlistSongs = _.sortBy(setlistSongs, 'sequenceNumber');

      return setlistSongs;

    });

    subscription.unsubscribe();

    var setlistSongsLength = setlistSongs.length;
    for(var i = 0; i < setlistSongsLength;i++){

      if(setlistSongs[i].sequenceNumber === 1) {
        this.af.database
          .object('/setlists/' + this.setlistId + '/songs/' + setlistSongs[i].key)
          .update(
            {
              displaySequenceNumber: 3,
              sequenceNumber: 3
            });
      }

      if(setlistSongs[i].sequenceNumber === 3) {
        this.af.database
          .object('/setlists/' + this.setlistId + '/songs/' + setlistSongs[i].key)
          .update(
            {
              displaySequenceNumber: 1,
              sequenceNumber: 1
            });
      }
    }
  }

  removeSong(setlistSong){
    this.af.database.list(`/setlists/` + this.setlistId + `/songs` ).remove(setlistSong.$key);
    //reorder the songs.

    this.refreshSongs();
  }

}
