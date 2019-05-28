import { Component, OnInit } from '@angular/core';
import { differenceInYears } from 'date-fns';
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
  constructor(private contentService: GetContentService, private about: AboutService) {

  }

  ngOnInit() {
    this.contentService.loading(true);
    this.yearOld = differenceInYears(new Date(), new Date(1994, 6, 23));
    this.about.getRepo().subscribe(value => {
      this.result = value;
      this.result = this.result.filter(item => {
        return this.repo.includes(item.name);
      });
      console.log(this.result);
    });
  }
  gotoLink(link) {
    window.open(link, '_blank');
  }
}
