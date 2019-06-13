import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from '../../services/auth.service';
import { GetContentService } from '../../services/get-content.service';
import { AuthProviderService } from '../../services/auth-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailError: string;
  buttonSubmit: string;
  isDisabledSubmitButton = false;
  userDetail;
  constructor(
    private Form: FormBuilder,
    private Service: AuthService,
    private contentService: GetContentService,
    private provider: AuthProviderService
    ) {
    this.form = this.Form.group({
      email: new FormControl(
        '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.contentService.loading(true);
    this.buttonSubmit = 'สมัครสมาชิก';
  }
  register() {
    this.buttonSubmit = 'รอสักครู่';
    this.isDisabledSubmitButton = true;
    this.Service.SignUp(this.form.value.email, this.form.value.passwordConfirm).then(() => {
      swal({
        title: 'สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ',
        icon: 'success'
      }).then(() => {
        setTimeout(() => {
          this.Service.SignOut();
        }, 500);
      });
    }).catch(e => {
      this.buttonSubmit = 'สมัครสมาชิก';
      this.isDisabledSubmitButton = false;

      if (e === 'The email address is already in use by another account.') {
        swal({
          title: 'อีเมลนี้เป็นสมาชิกอยู่แล้ว',
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

  googleRegister() {
    this.provider.googleSign().then(user => {
      this.userDetail = user;
      if (!this.userDetail.additionalUserInfo.isNewUser) {
        swal({
          title: 'อีเมลนี้ เป็นสมัครสมาชิกอยู่แล้ว กรุณาเข้าสู่ระบบ',
          icon: 'success'
        }).then(() => {
          setTimeout(() => {
            this.Service.SignOut();
          }, 500);
        });
      } else {
        swal({
          title: 'สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ',
          icon: 'success'
        }).then(() => {
          setTimeout(() => {
            this.Service.SignOut();
          }, 500);
        });
      }
    }).catch(e => {
      swal({
        title: 'มีบางอย่างผิดพลาด',
        icon: 'error'
      });
    });
  }
  facebookRegister() {
    this.provider.facebookSign().then(user => {
      this.userDetail = user;
      if (!this.userDetail.additionalUserInfo.isNewUser) {
        swal({
          title: 'อีเมลนี้ เป็นสมัครสมาชิกอยู่แล้ว กรุณาเข้าสู่ระบบ',
          icon: 'success'
        }).then(() => {
          setTimeout(() => {
            this.Service.SignOut();
          }, 500);
        });
      } else {
        swal({
          title: 'สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ',
          icon: 'success'
        }).then(() => {
          setTimeout(() => {
            this.Service.SignOut();
          }, 500);
        });
      }
    }).catch(e => {
      console.log(e);
      swal({
        title: 'มีบางอย่างผิดพลาด',
        icon: 'error'
      });
    });
  }
}
