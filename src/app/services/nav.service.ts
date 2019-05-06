import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  navBar: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  checkNav(value) {
    if (value) {
      this.navBar.emit(true);
    } else {
      this.navBar.emit(false);
    }
  }
}
