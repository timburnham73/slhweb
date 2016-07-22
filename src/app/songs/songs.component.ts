import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from "@angular2-material/list/list";
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-songs',
  templateUrl: 'songs.component.html',
  styleUrls: ['songs.component.css'],
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon, MdToolbar, MD_LIST_DIRECTIVES],
  providers: [MdIconRegistry]
})
export class SongsComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/songs');


  }
  onRowClick(song){
    console.log(song);
  }

  add(newName: string, length: string, key: string) {
    this.items.push({ name: newName, length: length, key: key });
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

  ngOnInit() {
  }

}
