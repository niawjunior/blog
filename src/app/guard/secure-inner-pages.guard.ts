import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(  public authService: AuthService, public router: Router, private auth: AngularFireAuth) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(authState => {
        if (authState) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}
