import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavService } from '../../services/nav.service';
import { GetContentService } from '../../services/get-content.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLogIn = false;
  isAdmin = false;
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
        if (user.emailVerified) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
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

  onClickedOutside(e: any) {
    const list = ['navbar-toggler-icon'
    , 'navbar-toggler hidden-sm-up'
    , 'navbar navbar-expand-md navbar-dark bg-dark fixed-top'
    , 'navbar-brand'
    , 'nav-link dropdown-toggle dropdown-toggle'
    ];
    if (!list.includes(e.srcElement.className)) {
      this.navService.checkNav(true);
    }
  }
}
