import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from './model/comment';
import { take } from 'rxjs/operators/take';

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
    const contentRef = this.afs.collection('post').doc(data.article).collection('comment');
    return await contentRef.add(commentData);
  }
    async getComment(url) {
      const itemsCollection = this.afs.collection<Comment>('post').doc(url).collection('comment', ref => ref.orderBy('timeStamp', 'asc'));
      return await itemsCollection.valueChanges().pipe(take(1));
    }
}

