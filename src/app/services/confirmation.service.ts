import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable()
export class ConfirmationService {
  private headers: HttpHeaders;
  private serverHost: String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public getConfirmation(id) {
    return this.http.get(this.serverHost + 'confirmation/' + id, {
      headers: this.headers
    });
  }
}
