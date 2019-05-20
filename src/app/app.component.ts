import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
  navLoading = false;
  isHome = false;
  constructor(
    private router: Router,
    private titleService: Title,
    private contentService: GetContentService,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private cdr: ChangeDetectorRef
    ) {
  }
  ngOnInit() {
    this.navLoading = false;
    this.contentService.loadContent.subscribe(value => {
      this.seo.generateTags(value);
     });
     this.contentService.loadFooter.subscribe((value) => {
      if (value) {
        this.navLoading = true;
      }
     });

    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      this.navLoading = false;
      this.cdr.detectChanges();
      while (route.firstChild) { route = route.firstChild; }
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      if (event.title === 'Blog') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
      this.titleService.setTitle(event['title']);
    });
}
}
