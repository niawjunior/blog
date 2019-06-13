import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private contentService: GetContentService) { }

  ngOnInit() {
    this.contentService.loading(true);
  }

}
