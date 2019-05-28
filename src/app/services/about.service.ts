import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getRepo() {
    return this.http.get('https://api.github.com/users/niawjunior/repos?per_page=1000');
  }
}
