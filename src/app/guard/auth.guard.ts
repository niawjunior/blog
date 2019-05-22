import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router,   private auth: AngularFireAuth) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(authState => {
        if (!authState) {
            this.router.navigate(['/login']);
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}
