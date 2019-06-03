import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Content, ContentDetail } from './model/content';
import { map, take } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class GetContentService {
  tempData: any = [];
  private itemsCollection: AngularFirestoreCollection<Content>;
  private itemsCollectionDetail: AngularFirestoreCollection<ContentDetail>;

  loadContent: EventEmitter<boolean> = new EventEmitter();
  loadNav: EventEmitter<boolean> = new EventEmitter();
  loadFooter: EventEmitter<boolean> = new EventEmitter();
  load = false;
  tempArticle: any = [];

  constructor(private afs: AngularFirestore, private loadingBar: LoadingBarService) {
  }
  // get all post for display in homepage
  async getAllPost() {
    this.loading(false);
    this.loadingBar.start();
    this.itemsCollectionDetail = this.afs.collection<ContentDetail>('postDetail', ref => ref.orderBy('timeStamp', 'desc'));
    return await this.itemsCollectionDetail.valueChanges().pipe(take(1));
  }
  // get post detail by slug
  async getPostDetail(slug) {
    this.loadingBar.start();
    this.itemsCollection = this.afs.collection<Content>('post', ref => ref.where('slugUrl', '==', slug));
    return await this.itemsCollection.valueChanges().pipe(
      take(1)
      , map(actions => actions.map(r => {
        const data = r as Content;
        return data;
      }))
    );
  }

  loading(key) {
    if (key) {
      this.loadingBar.stop();
      this.loadNav.emit(true);
      this.loadFooter.emit(true);
    } else {
      this.loadingBar.start();
      this.loadNav.emit(false);
    }
  }
  setLoad(data) {
    this.loadContent.emit(data);
  }
  getTemp() {
    return this.tempData;
  }
  setTemp(data) {
    this.tempData = data;
  }
  // set article in array memory for speed load
  setArticle(data) {
    // if data in temp article is exist
    if (this.tempArticle.length !== 0) {
      this.tempArticle.forEach(item => {
        if (item.slugUrl !== data.slugUrl) {
          this.tempArticle = [... this.tempArticle,  data];
        }
      });
    } else {
      this.tempArticle.push(data);
    }
  }
  getArticle(slug) {
    this.loadingBar.start();
    const data = this.tempArticle.filter(item => {
      return item.slugUrl === slug;
    });
    return data[0];
  }
}
