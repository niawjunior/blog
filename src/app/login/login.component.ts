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
  constructor(private Form: FormBuilder, private Service: AuthService) {
    this.form = this.Form.group({
      email: new FormControl(
        '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }
  login() {
    this.Service.SignIn(this.form.value.email, this.form.value.password).then(() => {
      swal({
        title: 'ยินดีต้อนรับ',
        icon: 'success'
      });
    });
  }
}
