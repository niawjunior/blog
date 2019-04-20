import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../services/get-content.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  arrayOfItems: any = [];
  newArray = [];
  result;
  constructor(private contentService: GetContentService) {

  }
  ngOnInit() {
      this.contentService.getAllPost().then(result => {
        result.subscribe(e => {
          e.forEach(elem => {
            this.arrayOfItems.push(elem.payload.doc.data());
           });
            for (let i = 0; i < this.arrayOfItems.length; i += 3) {
            this.newArray.push({ items: this.arrayOfItems.slice(i, i + 3) });
          }
      });
    });
  }
}
