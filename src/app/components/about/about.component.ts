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
  result;
  resultArr = [];
  language = [];
  skill = [];
  constructor(private contentService: GetContentService, private about: AboutService) {

  }

  ngOnInit() {
    this.contentService.loading(true);
    this.yearOld = differenceInYears(new Date(), new Date(1994, 6, 23));
    this.about.getRepo().subscribe(value => {
      this.result = value;
      this.resultArr = [];
      this.result.filter(item => {
          this.resultArr.push({
            'name': item.name,
            'star': item.stargazers_count,
            'fork': item.forks_count,
            'language': item.language,
            'created_at': item.created_at,
            'timeStamp': getTime(item.created_at),
            'clone_url': item.clone_url
          });
          this.language.push(item.language);
      });
      this.resultArr = this.resultArr.sort((x, y) => {
        return y.timeStamp - x.timeStamp;
      });
      const item = this.language.reduce((prev, cur) => {
        if (prev) {
          prev[cur] = (prev[cur] || 0) + 1;
        }
        return prev;
      }, {});

      Object.keys(item).map(key => {
        if (key !== 'null') {
          this.skill.push({skill: key, count: item[key]});
        }
      });
      console.log(this.skill);
    });
  }
  gotoLink(link) {
    window.open(link, '_blank');
  }
}
