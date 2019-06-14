import { Injectable } from '@angular/core';
import { User } from './model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GetContentService } from './get-content.service';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private contentService: GetContentService,
    private helper: HelperService
    ) {

  }

  SignIn(email, password) {
    this.contentService.loading(false);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.contentService.loading(true);
        return result;
      }).catch((error) => {
        this.contentService.loading(true);
        throw error.message;
      });
  }
  SignUp(email, password) {
    this.contentService.loading(false);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.contentService.loading(true);
        this.SetUserData(result.user).then((user) => {
          return user;
        });
      }).catch((error) => {
        this.contentService.loading(true);
        throw error.message;
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      website: '',
      bio: '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      profileURL: String(user.email).split('@')[0] + '@' + this.helper.randomId(2),
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  SignOut() {
    this.contentService.loading(false);
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
      this.contentService.loading(true);
    });
  }
  isAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }
}
