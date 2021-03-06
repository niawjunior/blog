import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ContentDetail } from './model/content';

@Injectable({
  providedIn: 'root'
})
export class PageViewService {
  constructor(private afs: AngularFirestore) { }
  public setPageView(key): void {
    const documentReference = this.afs.collection<ContentDetail>('post').doc(key);
    this.afs.firestore.runTransaction(page => {
        return page.get(documentReference.ref)
            .then(doc => {
                const newValue = doc.data().view + 1;
                page.update(documentReference.ref, {
                    view: newValue
                });
            }).catch(e => {
              console.log(e);
            });
    }).catch(e => {
      console.log(e);
    });
  }
}
