import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Content } from './content';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetContentService {
  private itemsCollection: AngularFirestoreCollection<Content>;
  items;

  constructor(private afs: AngularFirestore) {

  }
  async getAllPost() {
    this.itemsCollection = this.afs.collection<Content>('post');
    return await this.itemsCollection.snapshotChanges();
  }
  async getPost(slug) {
   this.itemsCollection = this.afs.collection<Content>('post');
   return await this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Content;
        if (a.payload.doc.id === slug) {
          return data;
        }
      }))
    );
  }

}
