import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Content } from './model/content';
@Injectable({
  providedIn: 'root'
})
export class UploadContentService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
    ) { }

   async uploadImage(file) {
    const filePath = Date.now() + '.jpg';
    const ref = this.storage.ref('upload').child(filePath);
    const image = await ref.put(file, {
      contentType: 'image/jpg'
    });
    const url = await this.getImageUrl(image);
    return url;
  }
  async getImageUrl(snapshot) {
    return await snapshot.ref.getDownloadURL();
  }

  async uploadContent(data) {
    const contentData: Content = {
      title: data.title,
      tag: data.tag,
      content: data.content,
      slugUrl: data.slugUrl,
      imageUrl: data.uploadImageUrl,
      description: data.description,
      timeStamp: Date.now(),
      view: data.view,
      status: true
    };
    const contentRef: AngularFirestoreDocument<any> = this.afs.doc(`post/${data.slugUrl}`);
    return contentRef.set(contentData, {
      merge: true
    });
  }
  async deleteContent(url) {
    const contentRef: AngularFirestoreDocument<any> = this.afs.doc(`post/${url}`);
    return await contentRef.update({
      status: false
    });
  }
}
