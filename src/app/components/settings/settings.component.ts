import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UploadContentService } from '../../services/upload-content.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  loadingImg = 'https://firebasestorage.googleapis.com/v0/b/blog-40f93.appspot.com/o/Spinner-1s-137px.gif?alt=media';
  defaultImg = 'https://firebasestorage.googleapis.com/v0/b/blog-40f93.appspot.com/o/631929649c.png?alt=media';
  imageProfile;
  isDisabledSubmitButton = false;
  userDetail;
  constructor(
    private formBuilder: FormBuilder,
    private contentService: GetContentService,
    private helper: HelperService,
    private auth: AuthService,
    private profile: ProfileService,
    public uploadService: UploadContentService,
    ) { }

  ngOnInit() {
    this.imageProfile = this.loadingImg;
    this.auth.isAuthenticated().subscribe(user => {
      if (user) {
        this.profile.getUser(user.uid).subscribe(value => {
          this.userDetail = value.data();
          this.imageProfile = value.data().photoURL || this.defaultImg;
          this.form.controls['email'].setValue(this.userDetail.email);
          this.form.controls['displayName'].setValue(this.userDetail.displayName);
          this.form.controls['website'].setValue(this.userDetail.website);
          this.form.controls['bio'].setValue(this.userDetail.bio);
        });
      }
    });
    this.contentService.loading(true);
    this.form = this.formBuilder.group({
      email: new FormControl({value: '', disabled: true}),
      displayName: new FormControl(''),
      website: new FormControl(''),
      bio: new FormControl('')
    });
    this.contentService.loadNav.emit(true);
  }

  update() {
    this.isDisabledSubmitButton = true;
    console.log('hello');
    // const uploadImage = this.imageProfile === this.defaultImg ? '' : this.imageProfile;
    // if (uploadImage) {
    //   this.profile.uploadImage(this.userDetail.uid, uploadImage).then(url => {
    //     this.profile.setUser({
    //       bio: this.form.value.bio,
    //       displayName: this.form.value.displayName,
    //       uid: this.userDetail.uid,
    //       photoURL: url,
    //       website: this.form.value.website
    //     }).then(() => {
    //       this.isDisabledSubmitButton = false;
    //     }).catch(() => {
    //       this.isDisabledSubmitButton = false;
    //     });
    //   }).catch(() => {
    //     this.isDisabledSubmitButton = false;
    //   });
    // } else {
    //   this.profile.setUser({
    //     bio: this.form.value.bio,
    //     displayName: this.form.value.displayName,
    //     photoURL: '',
    //     uid: this.userDetail.uid,
    //     website: this.form.value.website
    //   }).then(() => {
    //     this.isDisabledSubmitButton = false;
    //   });
    // }
  }
  change(event) {
    this.helper.readImage(event.target).then(value => {
      this.imageProfile = value;
    }).catch(() => {
      this.imageProfile = this.defaultImg;
    });
  }
}
