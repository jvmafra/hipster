import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { Injector } from '@angular/core'
import 'rxjs/add/operator/do';

@Injectable()
export class RequestTokenInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 498) {
            const userService = this.inj.get(UserService);
            userService.logoutUser();
          }
        }
      });
  }

}
