import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) {}

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.router.navigate(['/songs']);
      this.af.auth.login({ email: email, password: password })
        .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    this.router.navigate(['/songs']);
  }

}
