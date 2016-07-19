import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/songs',{
      query:{
        orderByChild: 'key'
      }
    });


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

  title = 'app works!';
}

