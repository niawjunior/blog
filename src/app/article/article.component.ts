import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { GetContentService } from '../services/get-content.service';
import { PageViewService } from '../services/page-view.service';

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
  loading = false;
  shareUrl = '';
  constructor(
    private contentService: GetContentService,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    private pageView: PageViewService,
    ) {

  }
  ngOnInit() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    this.getUrl = currentUrl[currentUrl.length - 1].split('?')[0];
    const getArticle = this.contentService.getArticle(this.getUrl);
    this.shareUrl = `https://www.pasupol.com/article/${this.getUrl}`;
    this.pageView.setPageView(this.getUrl);
    if (getArticle) {
      const elem = getArticle;
      this.shareData = elem;
      this.head = elem.title;
      this.contentService.setLoad(elem);
      this.contentService.loading(true);
      this.loading = false;
      this.loadingContent = true;
      this.article = elem.content;
    } else {
      this.loading = true;
      this.contentService.getPostDetail(this.getUrl).then(result => {
        result.subscribe(e => {
          e.forEach(elem => {
            if (elem) {
              this.head = elem.title;
              this.shareData = elem;
              this.contentService.setLoad(elem);
              this.article = elem.content;
              this.contentService.loading(true);
              this.loading = false;
              this.loadingContent = true;
            }
           });
          });
      });
    }
  }
}
