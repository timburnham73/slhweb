import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire) {}

  ngOnInit() {
  }

    login(email: string, password: string) {
        this.af.auth.login({ email: email, password: password });
    }

}
