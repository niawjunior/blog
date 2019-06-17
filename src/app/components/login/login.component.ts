import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from '../../services/auth.service';
import { GetContentService } from '../../services/get-content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProviderService } from '../../services/auth-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  emailError: string;
  buttonSubmit: string;
  isDisabledSubmitButton = false;
  userDetail;
  callBackUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Form: FormBuilder,
    private Service: AuthService,
    private provider: AuthProviderService,
    private contentService: GetContentService) {
    this.form = this.Form.group({
      email: new FormControl(
        '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.callBackUrl = this.route.snapshot.queryParamMap.get('callback');
    this.contentService.loading(true);
    this.buttonSubmit = 'เข้าสู่ระบบ';
  }
  login() {
    this.buttonSubmit = 'รอสักครู่';
    this.isDisabledSubmitButton = true;
    this.Service.SignIn(this.form.value.email, this.form.value.password).then(() => {
    setTimeout(() => {
      if (this.callBackUrl) {
        this.router.navigate(['article/' + this.callBackUrl]);
      } else {
        this.router.navigate(['/']);
      }
    }, 500);
    }).catch(e => {
      this.buttonSubmit = 'เข้าสู่ระบบ';
      this.isDisabledSubmitButton = false;
      if (e === 'The password is invalid or the user does not have a password.') {
        swal({
          title: 'รหัสผ่านไม่ถูกต้อง',
          icon: 'error'
        });
      } else {
        swal({
          title: 'มีบางอย่างผิดพลาด',
          icon: 'error'
        });
      }
    });
  }
  facebookLogin() {
    this.provider.facebookSign().then(user => {
      this.userDetail = user;
      if (this.userDetail.user.email) {
          if (this.callBackUrl) {
            this.router.navigate(['article/' + this.callBackUrl]);
          } else {
            this.router.navigate(['/']);
          }
      }
    });
  }
  googleLogin() {
    this.provider.googleSign().then(user => {
      this.userDetail = user;
      if (this.userDetail.user.email) {
          if (this.callBackUrl) {
            this.router.navigate(['article/' + this.callBackUrl]);
          } else {
            this.router.navigate(['/']);
          }
      }
    });
  }
}
