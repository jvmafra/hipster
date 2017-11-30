import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './app.router';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserPostComponent } from './user-post/user-post.component';
import { UserService } from './services/user.service';
import { GlobalService} from './services/global.service'
import { FormValidationService } from './services/form-validation.service'
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderTokenInterceptor } from './services/interceptor/handle-header-token.interceptor';
import { RequestTokenInterceptor } from './services/interceptor/handle-request-token.interceptor';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePostComponent } from './timeline/timeline-post/timeline-post.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';
import { PublicationService } from './services/publication.service';

PublicationService
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    RegisterComponent,
    UserPostComponent,
    DeleteModalComponent,
    TimelineComponent,
    TimelinePostComponent,
    PostPageComponent,
    SuccessMsgComponent,
    ErrorMsgComponent,
    CreatePostModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTokenInterceptor,
      multi: true
    },
    HttpClientModule,
    HipsterTranslate,
    UserService,
    GlobalService,
    FormValidationService,
    AuthService,
    StorageService,
    PublicationService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routes,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
