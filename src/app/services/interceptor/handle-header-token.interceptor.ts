import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';

import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core'
import 'rxjs/add/operator/do';

@Injectable()
export class HeaderTokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storageService.getAccessToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': this.storageService.getAccessToken()
        }
      });
    }

    return next.handle(request);
  }
}
