import { BrowserModule, Title} from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './routes/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ItemComponent } from './components/item/item.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TransferHttpCacheModule} from '@nguniversal/common';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { ClickOutsideModule } from 'ng4-click-outside';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';
import { DateTimePipe } from './pipe/date-time.pipe';
import { ProfileComponent } from './components/profile/profile.component';

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
    TimeAgoPipe,
    DateTimePipe,
    CommentBoxComponent,
    MarkdownEditorComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-blog' }),
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
  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    @Inject(APP_ID) public appId: string) {
    const platform = isPlatformBrowser(platformId) ?
    'on the server' : 'in the browser';
    // console.log(`Running ${platform} with appId=${appId}`);
    }
}
