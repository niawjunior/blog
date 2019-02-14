import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  arrayOfItems = [
    {
      title: 'red',
      subTitle: 'f00',
      description: 'toto lorem ispum soil t',
      image: 'https://cdn-images-1.medium.com/max/1600/1*MmOyN03qCgTfVWoIjvXmKw.png',
    },
    {
      title: 'blue',
      subTitle: 'aaas',
      description: 'toto lorem ispum soil t',
      image: 'https://cdn-images-1.medium.com/max/1600/1*MmOyN03qCgTfVWoIjvXmKw.png',
    },
    {
      title: 'toto',
      subTitle: 'f00',
      description: 'toto lorem ispum soil t toto lorem ispum soil t',
      image: 'https://cdn-images-1.medium.com/max/1600/1*MmOyN03qCgTfVWoIjvXmKw.png',
    },
    {
      title: 'red',
      subTitle: 'toto',
      description: 'toto lorem toto lorem ispum soil ttoto lorem ispum soil ttoto lorem ispum soil ttoto lorem ispum soil t soil t',
      image: 'https://cdn-images-1.medium.com/max/1600/1*MmOyN03qCgTfVWoIjvXmKw.png',
    }
  ];
  newArray = [];

  ngOnInit() {

    for (let i = 0; i < this.arrayOfItems.length; i += 3) {

      this.newArray.push({ items: this.arrayOfItems.slice(i, i + 3) });
    }
  }

}
