import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  yearOld;
  constructor() { }

  ngOnInit() {
    this.yearOld = moment().diff('1994-06-23', 'years');
  }

}
