import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLogIn: Boolean = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.isLogIn = true;
    } else {
      this.isLogIn = false;
    }
  }

  signOut() {
    this.authService.SignOut();
  }
}
