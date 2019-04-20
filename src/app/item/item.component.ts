import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../article-card/model';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  loading = true;
  constructor(private router: Router) {

  }
  imgUrl = './assets/default.png';
  ngOnInit() {
    if (this.item) {
      setTimeout(() => {
        if (this.item.imageUrl) {
          this.imgUrl = this.item.imageUrl;
        } else {
          this.imgUrl = './assets/default.png';
        }
        this.loading = false;
      }, 1500);
    }
}
readArticle(slug) {
  this.router.navigateByUrl(`article/${slug}`);
}
}
