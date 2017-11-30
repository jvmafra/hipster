import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service'

@Injectable()
export class PublicationService {
  private headers : HttpHeaders;
  private serverHost : String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public savePublication(publication) {
    return this.http.post(this.serverHost + 'v1/publicacao', JSON.stringify(publication), {
      headers: this.headers
    });
  }

  public getGenreColorObjects() {
    return {
      'Pop': 'red',
      'Rock': 'orange',
      'Funk': 'yellow',
      'Rap': 'olive',
      'Reggae': 'green',
      'Classic': 'teal',
      'b': 'blue',
      'c': 'violet',
      'd': 'purple',
      'e': 'pink',
      'f': 'brown',
      'g': 'grey',
      'h': 'black'
    };
  }

  public getListGenres() {
    return [ {name: "Pop", value:"Pop"},
             {name: "Rock", value:"Rock"},
             {name: "Funk", value:"Funk"},
             {name: "Rap", value:"Rap"},
             {name: "Reggae", value:"Reggae"},
            {name: "Classic", value:"Classic"}];
  }

}
