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
  loading = false;
  constructor(
    private contentService: GetContentService,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    private pageView: PageViewService
    ) {
  }
  ngOnInit() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    this.getUrl = currentUrl[currentUrl.length - 1];
    const getArticle = this.contentService.getArticle(this.getUrl);
    this.pageView.setPageView(this.getUrl);
    if (getArticle) {
      const elem = getArticle;
      this.shareData = elem;
      this.loadingContent = true;
      this.contentService.setLoad(elem);
      this.contentService.loading(true);
      this.article = elem.content;
    } else {
      this.loading = true;
      this.contentService.getPostDetail(this.getUrl).then(result => {
        result.subscribe(e => {
          e.forEach(elem => {
            if (elem) {
              this.loading = false;
              this.shareData = elem;
              this.loadingContent = true;
              this.contentService.setLoad(elem);
              this.article = elem.content;
            }
           });
           this.contentService.loading(true);
          });
      });
    }
  }
}
