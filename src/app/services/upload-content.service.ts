import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Content } from './content';

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
      view: 1,
      status: true
    };

    await this.uploadContentDetail(contentData);
    const contentRef: AngularFirestoreDocument<any> = this.afs.doc(`post/${data.slugUrl}`);
    return contentRef.set(contentData, {
      merge: true
    });
  }
  async uploadContentDetail(data) {
    const contentData = {
      title: data.title,
      tag: data.tag,
      slugUrl: data.slugUrl,
      imageUrl: data.imageUrl,
      description: data.description,
      timeStamp: Date.now(),
      view: 0,
      status: data.status
    };

    const contentRef: AngularFirestoreDocument<any> = this.afs.doc(`postDetail/${data.slugUrl}`);
    return contentRef.set(contentData, {
      merge: true
    });
  }
}
