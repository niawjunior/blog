import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';

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
    path: 'post', component: MarkdownEditorComponent, canActivate: [AuthGuard]
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
