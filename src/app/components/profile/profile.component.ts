import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  loadingImg = 'https://firebasestorage.googleapis.com/v0/b/blog-40f93.appspot.com/o/Spinner-1s-137px.gif?alt=media';
  defaultImg = 'https://firebasestorage.googleapis.com/v0/b/blog-40f93.appspot.com/o/631929649c.png?alt=media';
  imageProfile;
  profileDetail;
  constructor(
    private contentService: GetContentService,
    private profile: ProfileService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contentService.loading(true);
    this.imageProfile = this.loadingImg;
    this.profile.getProfile(this.router.snapshot.paramMap.get('id')).then(result => {
      result.subscribe(value => {
        value.forEach(item => {
          this.profileDetail = item.data();
          this.imageProfile = this.profileDetail.photoURL;
        });
      });
    });
  }

  gotoWebsite(website) {
    window.open(website, '_blank');
  }
}
