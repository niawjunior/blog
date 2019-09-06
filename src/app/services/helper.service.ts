import { Injectable, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private location: Location, @Inject(DOCUMENT) private document: any) { }

  getCurrentUrl() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    return currentUrl[currentUrl.length - 1].split('?')[0];
  }

  readImage(inputValue: any) {
    return new Promise((resolve, reject) => {
      const file: File = inputValue.files[0];
      if (file) {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = () => {
           resolve(myReader.result);
        };
        myReader.readAsDataURL(file);
      } else {
        reject('error');
      }
    });
  }
  getProfileUrl(email) {
    if (email) {
      const r = email.split('').reverse().join('').split('.').reverse()[0].split('@').join('').substr(0, 3) + email.substr(0, 2);
      const t = r.split('').map(i => i.charCodeAt()).join('');
      return t;
    } else {
      return '';
    }
  }

   randomId(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + String(Date.now()).slice(0, 2);
  }

  getFullUrl() {
    return decodeURI(this.document.location.href);
  }
  getDomain() {
    return decodeURI(this.document.location);
  }
}
