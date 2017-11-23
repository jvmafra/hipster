import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private serverHost: String;

  constructor() {
    this.serverHost = 'https://mysterious-waters-22741.herokuapp.com/api/';
  }

  public getServerHost() {
    return this.serverHost;
  }
}
