import {Component, OnInit, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseRef, AuthProviders} from "angularfire2/angularfire2";
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MdToolbar} from '@angular2-material/toolbar';
import {Subject} from "rxjs/Subject";

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
  private artists: FirebaseListObservable<any[]>;
  public song:any;
  private artistNameSubject : Subject<any>;

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
    this.artists = this.af.database.list('/artists');
    this.sub = this.route.params.subscribe(params => {
      let id:string = params['songid'];
      this.song = this.af.database.object('/songs/' + id);
      this.isNew = id === 'new'? true:false;


    });
  }

  save(name:string,
       length:string,
       key:string,
       tempo:string,
       artist:string,
       genre:string,
       lyrics:string,
       notes:string,
       other:string
  ){
    if(this.isNew === true){

      //this.artists.map( artists => artists.filter(artist => artist.name === artist.name));

      var newItemKey = this.songs.push({name:name,length:length,key:key, tempo:tempo,lyrics:lyrics, uid:this.uid}).key;


    }
    else
    {

      this.getOrCreateArtist(artist).then(
        function(result){
          var artistKey;
          if(result){
            artistKey = result['$key'];
          }
          else{
            artistKey = this.artists.set({name:artist}).key;
          }

          /*const user = this.af.database.object(`users/${login}`);
          user.subscribe(data => {
            if(data.$value !== null) {
              console.log('User does not exist');
            } else {
              console.log('User does exist');
            }
          });*/

          this.song.update({name:name,length:length,key:key, tempo:tempo, lyrics:lyrics, artistId:artistKey});
        }
      );

    }

    this.router.navigate(['/songs']);
  }

  getOrCreateArtist(name: string){

    this.artistNameSubject = new Subject();
    this.artistNameSubject.next(name);
    return new Promise((resolve, reject) => {

    this.af.database.list('/artists', {
      query: {
        orderByChild: 'name',
        equalTo: this.artistNameSubject
      }
    }).subscribe(response => {
      if(response.length === 0) {
        resolve(null);

      } else {
        resolve(response[0]);
      }
    });

    });
  }



}
