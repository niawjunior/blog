import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetContentService } from '../../services/get-content.service';
import { PageViewService } from '../../services/page-view.service';
import {format} from 'date-fns';
import * as th from 'date-fns/locale/th';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

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
    private pageView: PageViewService,
    private auth: AuthService,
    private helper: HelperService,
    private router: Router
    ) {

  }
  ngOnInit() {
    this.getUrl = this.helper.getCurrentUrl();
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

  editPost() {
    this.router.navigateByUrl('post/' + this.getUrl);
  }
}
