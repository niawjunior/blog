import { Component, OnInit } from '@angular/core';
import { GetContentService } from '../../services/get-content.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UploadContentService } from '../../services/upload-content.service';
import Swal from 'sweetalert2'

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
  setUser(data) {
    this.isDisabledSubmitButton = true;
    this.profile.setUser({
      bio: data.bio,
      displayName: data.displayName,
      uid: data.uid,
      photoURL: data.photoURL,
      website: data.website
    }).then(() => {
      Swal.fire({
        title: 'อัพเดทสำเร็จ',
        type: 'success'
      }).then(() => {
        this.isDisabledSubmitButton = false;
      });
    }).catch(() => {
      console.log('error');
      this.isDisabledSubmitButton = false;
    });
  }
  update() {
    this.isDisabledSubmitButton = true;
    const uploadImage = this.imageProfile === this.defaultImg ? '' : this.imageProfile;
    if (uploadImage) {
      if (/\/firebasestorage/g.test(uploadImage)) {
        this.setUser({
          bio: this.form.value.bio,
          displayName: this.form.value.displayName,
          uid: this.userDetail.uid,
          photoURL: this.imageProfile,
          website: this.form.value.website
        });
      } else {
        this.profile.uploadImage(this.userDetail.uid, uploadImage).then(url => {
          this.setUser({
            bio: this.form.value.bio,
            displayName: this.form.value.displayName,
            uid: this.userDetail.uid,
            photoURL: url,
            website: this.form.value.website
          });
        }).catch(() => {
          this.isDisabledSubmitButton = false;
        });
      }
    } else {
      this.setUser({
        bio: this.form.value.bio,
        displayName: this.form.value.displayName,
        photoURL: uploadImage || '',
        uid: this.userDetail.uid,
        website: this.form.value.website
      });
    }
  }
  change(event) {
    this.helper.readImage(event.target).then(value => {
      this.imageProfile = value;
    }).catch(() => {
      this.imageProfile = this.defaultImg;
    });
  }
}
