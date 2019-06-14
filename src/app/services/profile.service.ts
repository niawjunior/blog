import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../services/model/user';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public afs: AngularFirestore, private storage: AngularFireStorage) { }

  getUser(uid) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    return userRef.get();
  }
  async setUser(data) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${data.uid}`);
    return userRef.update({
      bio: data.bio,
      displayName: data.displayName,
      photoURL: data.photoURL,
      website: data.website
    });
  }

  async uploadImage(uid, file) {
    const filePath = Date.now() + '.jpg';
    const ref = this.storage.ref('profile/' + uid).child(filePath);
    const image = await ref.putString(file, 'data_url', {
       contentType: 'image/jpg'
     });
    const url = await this.getImageUrl(image);
    return url;
 }
 async getImageUrl(snapshot) {
   return await snapshot.ref.getDownloadURL();
 }
 async getProfile(data) {
  const profile = this.afs.collection('users', ref => ref.where('profileURL', '==', data));
  return profile.get();
 }
}
