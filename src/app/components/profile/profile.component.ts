import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  profileName;
  defaultName = 'ยังไม่ได้ระบบุชื่อ';
  constructor(
    private contentService: GetContentService,
    private profile: ProfileService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.contentService.loading(true);
    this.imageProfile = this.loadingImg;
    this.profile.getProfile(this.router.snapshot.paramMap.get('id')).then(result => {
      result.subscribe(value => {
        if (value.docs.length !== 0) {
          value.forEach(item => {
            this.profileDetail = item.data();
            this.profileName = this.profileDetail.displayName ? this.profileDetail.displayName : this.defaultName;
            if (this.profileDetail.photoURL) {
              this.imageProfile = this.profileDetail.photoURL;
            } else {
              this.imageProfile = this.defaultImg;
            }
          });
        } else {
          this.route.navigateByUrl('/');
        }
      });
    });
  }

  gotoWebsite(website) {
    window.open(website, '_blank');
  }
}
