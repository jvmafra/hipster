import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service'

@Injectable()
export class SearchService {
  private headers : HttpHeaders;
  private serverHost : String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public search (params) {
    return this.http.get(this.serverHost + 'v1/search', {
      headers: this.headers,
      params: {
        textSearch: params.textSearch,
        skip: params.skip,
        user: params.user
      }
    });
  }

}
