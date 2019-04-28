import { Component, OnInit } from '@angular/core';
import { differenceInYears } from 'date-fns';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  yearOld;
  constructor() { }

  ngOnInit() {
    this.yearOld = differenceInYears(new Date(), new Date(1994, 6, 23));
}
}
