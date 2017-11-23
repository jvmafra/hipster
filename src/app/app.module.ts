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
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderTokenInterceptor } from './services/interceptor/handle-header-token.interceptor';
import { RequestTokenInterceptor } from './services/interceptor/handle-request-token.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    RegisterComponent,
    UserPostComponent
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
    AuthService,
    StorageService
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
