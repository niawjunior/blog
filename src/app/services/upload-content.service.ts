import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Content } from './content';

@Injectable({
  providedIn: 'root'
})
export class UploadContentService {

  constructor(private http: HttpClient, private storage: AngularFireStorage, public afs: AngularFirestore) { }

   async uploadImage(file) {
    const filePath = Date.now() + '.jpg';
    const ref = this.storage.ref('upload').child(filePath);
    const image = await ref.putString(file, 'data_url', {
      contentType: 'image/jpg'
    });
    const url = await this.getImageUrl(image);
    return url;
  }
  async getImageUrl(snapshot) {
    return await snapshot.ref.getDownloadURL();
  }
  async uploadContent(title, content, slugUrl, imageUrl) {
    const contentData: Content = {
      title,
      content,
      slugUrl,
      imageUrl
    };

    const contentRef: AngularFirestoreDocument<any> = this.afs.doc(`post/${slugUrl}`);
    return contentRef.set(contentData, {
      merge: true
    });
  }
}
