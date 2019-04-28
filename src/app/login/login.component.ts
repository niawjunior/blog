import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from '../services/auth.service';

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

  constructor(private Form: FormBuilder, private Service: AuthService) {
    this.form = this.Form.group({
      email: new FormControl(
        '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.buttonSubmit = 'เข้าสู่ระบบ';
  }
  login() {
    this.buttonSubmit = 'รอสักครู่';
    this.isDisabledSubmitButton = true;
    this.Service.SignIn(this.form.value.email, this.form.value.password).then(() => {
      swal({
        title: 'ยินดีต้อนรับ',
        icon: 'success'
      }).then(() => {
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      });
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
}
