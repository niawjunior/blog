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
}
