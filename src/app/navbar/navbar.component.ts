import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLogIn: Boolean = false;
  constructor(private authService: AuthService, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isLogIn = true;
      } else {
        this.isLogIn = false;
      }
    });
  }

  signOut() {
    this.authService.SignOut();
  }
}
