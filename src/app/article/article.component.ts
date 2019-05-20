import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { GetContentService } from '../services/get-content.service';
import { PageViewService } from '../services/page-view.service';
import {format} from 'date-fns';
import * as th from 'date-fns/locale/th';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  getUrl;
  article = '';
  loadingContent = false;
  shareData;
  head = '';
  shareUrl = '';
  postDate = '';
  tag = '';
  constructor(
    private contentService: GetContentService,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    private pageView: PageViewService,
    private auth: AuthService

    ) {

  }
  ngOnInit() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    this.getUrl = currentUrl[currentUrl.length - 1].split('?')[0];
    const getArticle = this.contentService.getArticle(this.getUrl);
    this.shareUrl = `https://www.pasupol.com/article/${this.getUrl}`;
    this.auth.isAuthenticated().subscribe(value => {
      if (value) {
        if (!value.emailVerified) {
          this.pageView.setPageView(this.getUrl);
        }
      } else {
        this.pageView.setPageView(this.getUrl);
      }
    });
    if (getArticle) {
      const elem = getArticle;
      this.shareData = elem;
      this.head = elem.title;
      this.tag = elem.tag;
      this.postDate = format(elem.timeStamp, 'DD MMMM YYYY : HH:mm', {locale: th});
      this.contentService.setLoad(elem);
      this.contentService.loading(true);
      this.loadingContent = true;
      this.article = JSON.parse(elem.content);
    } else {
      this.contentService.getPostDetail(this.getUrl).then(result => {
        result.subscribe(e => {
          e.forEach(elem => {
            if (elem) {
              this.postDate = format(elem.timeStamp, 'DD MMMM YYYY : HH:mm', {locale: th});
              this.head = elem.title;
              this.tag = elem.tag;
              this.shareData = elem;
              this.contentService.setLoad(elem);
              this.article = JSON.parse(elem.content);
              this.contentService.loading(true);
              this.loadingContent = true;
            }
           });
          });
      });
    }
  }
}
