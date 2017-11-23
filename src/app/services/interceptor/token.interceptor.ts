import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storageService.getAccessToken();
    console.log(token);
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
