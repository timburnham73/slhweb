import {Component} from '@angular/core';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TitleBarComponent} from './title-bar/title-bar.component';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MdIcon, MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES, ROUTER_DIRECTIVES, TitleBarComponent],
  providers: [MdIconRegistry]
})
export class AppComponent {
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    }
  ];

  title = 'app works!';
}

