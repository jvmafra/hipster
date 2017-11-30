import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private serverHost: String;

  constructor() {
    this.serverHost = 'https://hipstermusic.herokuapp.com/api/';
  }

  public getServerHost() {
    return this.serverHost;
  }
}
