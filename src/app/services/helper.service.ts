import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private location: Location) { }

  getCurrentUrl() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    return currentUrl[currentUrl.length - 1].split('?')[0];
  }
}
