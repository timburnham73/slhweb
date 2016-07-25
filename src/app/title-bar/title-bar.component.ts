import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
             moduleId: module.id,
             selector: 'app-title-bar',
             inputs: ['sidenav'],
             templateUrl: 'title-bar.component.html',
             styleUrls: ['title-bar.component.css'],
             directives: [MdButton, MdIcon, MD_LIST_DIRECTIVES, MdToolbar, ROUTER_DIRECTIVES],
             providers: [MdIconRegistry]
           })
export class TitleBarComponent implements OnInit {
  title = 'Setlist Helper';

  constructor(public af: AngularFire, private router: Router) {

  }

  ngOnInit() {
  }

  logout(){
    this.af.auth.logout();
    this.router.navigate(['/login']);
  }
}
