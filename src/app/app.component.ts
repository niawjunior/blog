import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GetContentService } from './services/get-content.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private contentService: GetContentService,
    private activatedRoute: ActivatedRoute,
    private fb: FacebookService
    ) {

      const initParams: InitParams = {
        appId: '1728020620554557',
        xfbml: true,
        version: 'v2.8'
      };
      fb.init(initParams);
  }
  ngOnInit() {
    this.contentService.loadContent.subscribe(value => {
       this.titleService.setTitle(value);
     });

    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) { route = route.firstChild; }
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => this.titleService.setTitle(event['title']));
}

share() {

  const params: UIParams = {
    href: 'https://github.com/zyra/ngx-facebook',
    method: 'share'
  };
  this.fb.ui(params)
    .then((res: UIResponse) => console.log(res))
    .catch((e: any) => console.error(e));
}
}
