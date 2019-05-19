import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from '../services/auth.service';
import { GetContentService } from '../services/get-content.service';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private Form: FormBuilder,
    private Service: AuthService,
    private contentService: GetContentService) {
    this.form = this.Form.group({
      email: new FormControl(
        '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.contentService.loadNav.emit(true);
    setTimeout(() => {
      this.contentService.loadFooter.emit(true);
    });
    this.buttonSubmit = 'เข้าสู่ระบบ';
  }
  login() {
    this.buttonSubmit = 'รอสักครู่';
    this.isDisabledSubmitButton = true;
    this.Service.SignIn(this.form.value.email, this.form.value.password).then(() => {
    setTimeout(() => {
      this.router.navigate(['/']);
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
}
