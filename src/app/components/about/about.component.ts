import { Component, OnInit } from '@angular/core';
import { differenceInYears, getTime } from 'date-fns';
import { GetContentService } from '../../services/get-content.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  yearOld;
  repo = [
   'blog',
   'project_final',
   'telegram-bot-airdrop.io',
   'telegram-crypto-alert',
   'one-piece-fb-auto-alert',
   'Ethereum-faucet-firebase-function',
   'ethereum-wallet-generator-api',
   'bookworm',
   'django-ecommerce',
   'new-friends-fb-app',
   'mock-up-psd',
   'decisiontree-php',
   'image-processing'
  ];
  result;
  resultArr = [];
  constructor(private contentService: GetContentService, private about: AboutService) {

  }

  ngOnInit() {
    this.contentService.loading(true);
    this.yearOld = differenceInYears(new Date(), new Date(1994, 6, 23));
    this.about.getRepo().subscribe(value => {
      this.result = value;
      this.resultArr = [];
      this.result.filter(item => {
        if (this.repo.includes(item.name)) {
          this.resultArr.push({
            'name': item.name,
            'star': item.stargazers_count,
            'fork': item.forks_count,
            'language': item.language,
            'created_at': item.created_at,
            'timeStamp': getTime(item.created_at),
            'clone_url': item.clone_url
          });
        }
      });
      this.resultArr = this.resultArr.sort((x, y) => {
        return y.timeStamp - x.timeStamp;
      });
    });
  }
  gotoLink(link) {
    window.open(link, '_blank');
  }
}
