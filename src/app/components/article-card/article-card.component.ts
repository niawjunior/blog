import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  arrayOfItems: any = [];
  newArray = [];
  result;
  temp = false;
  constructor(private contentService: GetContentService) {

  }
  ngOnInit() {
      if (this.contentService.getTemp().length !== 0) {
        this.temp = true;
        for (let i = 0; i < this.contentService.getTemp().length; i += 3) {
          this.newArray.push({ items: this.contentService.getTemp().slice(i, i + 3)});
        }
        this.contentService.loading(true);
      } else {
        this.contentService.getAllPost().then(result => {
          result.subscribe(e => {
            e.forEach(elem => {
              if (elem.status) {
                this.arrayOfItems.push(elem);
              }
            });
            this.contentService.setTemp(this.arrayOfItems);
            for (let i = 0; i < this.arrayOfItems.length; i += 3) {
              this.newArray.push({ items: this.arrayOfItems.slice(i, i + 3) });
            }
              this.contentService.loading(true);
        });
      });
      }
  }
}
