import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UploadPhotoModalComponent } from './profile-page/upload-photo-modal/upload-photo-modal.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { router } from './app.router';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserPostComponent } from './user-post/user-post.component';
import { UserService } from './services/user.service';
import { ReportService } from './services/report.service';
import { SearchService } from './services/search.service';
import { GlobalService} from './services/global.service';
import { FormValidationService } from './services/form-validation.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderTokenInterceptor } from './services/interceptor/handle-header-token.interceptor';
import { RequestTokenInterceptor } from './services/interceptor/handle-request-token.interceptor';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePostComponent } from './timeline/timeline-post/timeline-post.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';
import { PublicationService } from './services/publication.service';
import { AlertService } from './services/alert.service';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { TermsConditionsModalComponent } from './terms-conditions-modal/terms-conditions-modal.component';
import { LoadIndicationComponent } from './load-indication/load-indication.component';
import { CreatePostHomeComponent } from './create-post-home/create-post-home.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import {ConfirmationService} from "./services/confirmation.service";
import { SearchComponent } from './search/search.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { TimelineUserComponent } from './timeline-user/timeline-user.component';
import { SearchItemComponent } from './search-item/search-item.component';

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
    CreatePostModalComponent,
    FeedbackModalComponent,
    PostCommentComponent,
    TermsConditionsModalComponent,
    LoadIndicationComponent,
    CreatePostHomeComponent,
    ConfirmationPageComponent,
    SearchComponent,
    TimelineUserComponent,
    SearchItemComponent,
    UploadPhotoModalComponent
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
    PublicationService,
    ReportService,
    AlertService,
    ConfirmationService,
    PublicationService,
    SearchService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InfiniteScrollModule,
    RouterModule.forRoot(router),
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
