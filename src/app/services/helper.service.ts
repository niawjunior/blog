import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router: Router, @Inject(DOCUMENT) private document: any) { }

  getCurrentUrl() {
    const currentUrl = decodeURI(this.router.url).split('/');
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
  getFullUrl() {
    return decodeURI(this.document.location.href);
  }
  getDomain() {
    return decodeURI(this.document.location);
  }
}
