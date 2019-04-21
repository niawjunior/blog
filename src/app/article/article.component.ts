import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { GetContentService } from '../services/get-content.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  getUrl;
  article = '';
  head;
  loadingContent = false;
  constructor(private contentService: GetContentService, public activatedRoute: ActivatedRoute, private location: Location) {
  }
  ngOnInit() {
    const currentUrl = decodeURI(this.location.path()).split('/');
    this.getUrl = currentUrl[currentUrl.length - 1];
    this.contentService.getPost(this.getUrl).then(result => {
      result.subscribe(e => {
        e.forEach(elem => {
          if (elem) {
            setTimeout(() => {
              this.loadingContent = true;
            }, 500);
            this.head = elem.title;
            this.contentService.setLoad(this.head);
            this.article = elem.content;
          }
         });
        });
    });
  }

}
