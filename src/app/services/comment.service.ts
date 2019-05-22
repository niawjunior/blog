import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) { }

  async postComment(data) {
    const commentData: Comment = {
      article: data.article,
      email: data.email,
      uid: data.uid,
      comment: data.comment,
      timeStamp: data.timeStamp
    };
    console.log(commentData);
    const contentRef = this.afs.collection('post').doc(data.article).collection('comment');
    return await contentRef.add(commentData);
  }
  getComment(data) {

  }
}
