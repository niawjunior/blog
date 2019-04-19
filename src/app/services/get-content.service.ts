import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Content } from './content';
import { Observable } from 'rxjs';
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
}
