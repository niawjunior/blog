import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './model/user';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private helper: HelperService
  ) { }

  async googleSign() {
    const provider = new auth.GoogleAuthProvider();
    return await this.socialSign(provider);
  }
  async facebookSign() {
    const provider = new auth.FacebookAuthProvider();
    return await this.socialSign(provider);
  }

  async socialSign(provider) {
    const signUp =  await this.afAuth.auth.signInWithPopup(provider);
    return await this.SetUserData(signUp);
   }

  async SetUserData(userDetail) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userDetail.user.uid}`);
    const userData: User = {
      uid: userDetail.user.uid,
      email: userDetail.user.email,
      website: '',
      bio: '',
      displayName:  userDetail.user.displayName || '',
      photoURL: userDetail.user.photoURL || '',
      profileURL: this.helper.getProfileUrl(String(userDetail.user.email).split('@')[0]),
      emailVerified: userDetail.user.emailVerified
    };
     await userRef.set(userData, {
      merge: true
    });
    return userDetail;
  }

}

