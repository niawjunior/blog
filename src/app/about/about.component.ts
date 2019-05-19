import { Component, OnInit } from '@angular/core';
import { differenceInYears } from 'date-fns';
import { GetContentService } from '../services/get-content.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  yearOld;
  constructor(private contentService: GetContentService) {

  }

  ngOnInit() {
    this.contentService.loadNav.emit(true);
    setTimeout(() => {
      this.contentService.loadFooter.emit(true);
    });
    this.yearOld = differenceInYears(new Date(), new Date(1994, 6, 23));
  }
}
