import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';

import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storageService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': this.storageService.getAccessToken()
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("DEU CERTO");
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("TOKEN EXPIRADO");
          }
        }
      });
  }

}
