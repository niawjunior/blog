import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ItemComponent } from './item/item.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ClickOutsideModule } from 'ng4-click-outside';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    ArticleComponent,
    LoginComponent,
    ArticleCardComponent,
    ItemComponent,
    RegisterComponent,
    SettingsComponent,
    SafeHtmlPipe,
    MarkdownEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    LoadingBarModule,
    BrowserModule.withServerTransition({appId: 'blog'}),
    TransferHttpCacheModule,
    ShareButtonsModule,
    ClickOutsideModule,
    AngularMarkdownEditorModule.forRoot({
      iconlibrary: 'glyph'
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  providers: [Title, AuthService, { provide: StorageBucket, useValue: 'blog-40f93.appspot.com'}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
