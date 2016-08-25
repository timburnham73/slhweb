import {Component, OnInit, AfterViewInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MD_LIST_DIRECTIVES} from "@angular2-material/list/list";
import {MdToolbar} from '@angular2-material/toolbar';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../account/auth/auth-service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {FirebaseRef} from 'angularfire2';

declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'app-songs',
  templateUrl: 'songs.component.html',
  styleUrls: ['songs.component.css'],
  directives: [ MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon, MdToolbar, MD_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MD_INPUT_DIRECTIVES],
  providers: [MdIconRegistry]
})
export class SongsComponent implements OnInit, AfterViewInit {
  items: FirebaseListObservable<any[]>;
  songs: Observable<any[]>;



  constructor(public af: AngularFire, mdIconRegistry: MdIconRegistry, private router: Router, auth: AuthService) {
    const subject = new Subject();
    const path = `/songs`;
    this.items = af.database.list(path);

    this.songs = af.database.list(path,{
      query:{
        orderByChild: 'name'
      }
    })
      .map((songs) => {
        return songs.filter(song => song.uid === auth.id).map((song) =>{
          song.artist = af.database.object(`/artist/${song.artistId}`);
          return song;
        })
    });



    mdIconRegistry
      .addSvgIconSetInNamespace('core', 'fonts/core-icon-set.svg')
  }
  onRowClick(song){
    this.router.navigate(['/songedit', song.$key]);
  }

  add(newName: string, length: string, key: string) {
    this.items.push({ name: newName, length: length, key: key });
  }
  addNew(){
    this.router.navigate(['/songedit', 'new']);
  }
  update(key: string, name: string) {
    this.items.update(key, { name: name });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }

  ngOnInit(){

  }

  ngAfterViewInit() {

  }

}


