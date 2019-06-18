import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  domainUrl;
  constructor(private helper: HelperService, private meta: Meta, private titleService: Title,
    ) {
      this.domainUrl = this.helper.getDomain();
    }
  generateTags(config) {
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: this.domainUrl });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.imageUrl });
    this.meta.updateTag({ property: 'og:url', content: `${this.domainUrl}article/${config.slugUrl}` });
    this.titleService.setTitle(config.title);
  }
}
