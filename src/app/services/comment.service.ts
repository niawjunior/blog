import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from './model/comment';
import { take } from 'rxjs/operators';

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
  // async get() {
  //   const data = [];
  //   await this.afs.collection('post').get().toPromise()
  //     .then(querySnapshot => {
  //       querySnapshot.docs.forEach(doc => {
  //         this.afs.collection('post').doc(doc.id)
  //         .collection('comment')
  //         .valueChanges()
  //         .pipe(take(1)).subscribe(value => {
  //           data.push({
  //             data: doc.data(),
  //             comment: value
  //           });
  //         });
  //     });
  //   });
  //   return data;
  // }

}

