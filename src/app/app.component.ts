import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GetContentService } from './services/get-content.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  constructor(
    private router: Router,
    private titleService: Title,
    private contentService: GetContentService,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
    ) {
  }
  ngOnInit() {
    this.contentService.loadContent.subscribe(value => {
      this.seo.generateTags(value);
       this.titleService.setTitle(value.title);
     });

     this.contentService.loadPage.subscribe(value => {
       if (value) {
         this.loading = false;
       }
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
    .subscribe((event) => {
      this.titleService.setTitle(event['title']);
    });
}
}
