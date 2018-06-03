import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable()
export class ReportService {
  private headers: HttpHeaders;
  private serverHost: String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public saveReport(report) {
    return this.http.post(this.serverHost + 'v1/report', JSON.stringify(report), {
      headers: this.headers
    });
  }



}
