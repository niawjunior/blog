import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ArticleComponent } from '../components/article/article.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guard/auth.guard';
import { SecureInnerPagesGuard } from '../guard/secure-inner-pages.guard';
import { RegisterComponent } from '../components/register/register.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { MarkdownEditorComponent } from '../components/markdown-editor/markdown-editor.component';
import { AdminGuard } from '../guard/admin.guard';
import { ProfileComponent } from '../components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { title: 'Blog' }
  },
  {
    path: 'about', component: AboutComponent, data: { title: 'About', description: 'Hello world' }
  },
  {
    path: 'article', component: ArticleComponent,
    children: [{
      path: ':id', component: ArticleComponent
    }]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard], data: { title: 'Login' }
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard], data: { title: 'Register' }
  },
  {
    path: 'post', component: MarkdownEditorComponent, canActivate: [AdminGuard],
    children: [
      {
        path: ':id', component: MarkdownEditorComponent
      }
    ]
  },
  {
    path: 'user/:id', component: ProfileComponent
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { initialNavigation: true });
