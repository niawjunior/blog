import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../article-card/model';
import { Router } from '@angular/router';
import { GetContentService } from '../services/get-content.service';
import {format} from 'date-fns';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() temp: any;
  loading = true;
  postDate: String = '';

  imgUrl = './assets/default.png';
  constructor(private router: Router, private contentService: GetContentService) {
  }
  ngOnInit() {
    this.postDate = format(this.item.timeStamp, 'DD-MMMM-YYYY');
    if (this.item && !this.temp) {
      setTimeout(() => {
        if (this.item.imageUrl) {
          this.imgUrl = this.item.imageUrl;
        } else {
          this.imgUrl = './assets/default.png';
        }
        this.loading = false;
      }, 500);
    } else {
      this.loading = false;
      if (this.item.imageUrl) {
        this.imgUrl = this.item.imageUrl;
      } else {
        this.imgUrl = './assets/default.png';
      }
    }
}
readArticle(slug) {
  if (this.contentService.getArticle(slug)) {
    this.router.navigateByUrl(`article/${slug}`);
  } else {
    this.contentService.getPostDetail(slug).then(result => {
      result.subscribe(data => {
        this.contentService.setArticle(data[0]);
        this.router.navigateByUrl(`article/${slug}`);
      });
    });
  }
}
}
