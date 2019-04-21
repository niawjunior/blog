import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { title: 'Blog' }
  },
  {
    path: 'about', component: AboutComponent, data: { title: 'About' }
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
    path: 'post', component: WysiwygEditorComponent, canActivate: [AuthGuard]
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
