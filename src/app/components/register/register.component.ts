import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from '../../services/auth.service';
import { GetContentService } from '../../services/get-content.service';

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

  constructor(private Form: FormBuilder, private Service: AuthService, private contentService: GetContentService) {
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
}
