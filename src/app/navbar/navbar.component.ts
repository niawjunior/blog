import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as $ from 'jquery';
import { NavService } from '../services/nav.service';
import { GetContentService } from '../services/get-content.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLogIn: Boolean = false;
  userEmail = '';
  navLoading = false;
  navBar: EventEmitter<boolean> = new EventEmitter();

  constructor(
     private contentService: GetContentService,
     private navService: NavService,
     private authService: AuthService,
     private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.contentService.loadNav.subscribe(value => {
      if (value) {
        this.navLoading = true;
      }
    });
    this.navService.navBar.subscribe(value => {
      if (value) {
        this.isNavbarCollapsed = true;
      } else {
        this.isNavbarCollapsed = false;
      }
    });
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.isLogIn = true;
      } else {
        this.userEmail = '';
        this.isLogIn = false;
      }
    });

  }

  showNav() {
    this.navService.checkNav(this.isNavbarCollapsed = !this.isNavbarCollapsed);
  }

  signOut() {
    this.authService.SignOut();
  }

  onClickedOutside(e: Event) {
    const click = $(e.target).attr('class');
    if (click !== 'navbar-toggler-icon'
    && click !== 'navbar-brand'
    && click !== 'navbar navbar-expand-md') {
      this.navService.checkNav(true);
    }
    if (click === 'navbar-brand') {
      this.navService.checkNav(true);
    }
  }
}
