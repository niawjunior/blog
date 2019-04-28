import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ContentDetail } from './content';

@Injectable({
  providedIn: 'root'
})
export class PageViewService {
  constructor(private afs: AngularFirestore) { }
  public setPageView(key): void {
    const documentReference = this.afs.collection<ContentDetail>('postDetail').doc(key);
    firebase.firestore().runTransaction(page => {
        return page.get(documentReference.ref)
            .then(doc => {
                const newValue = doc.data().view + 1;
                page.update(documentReference.ref, {
                    view: newValue
                });
            });
    }).catch(() => {
      console.log('error');
    });
  }

}
