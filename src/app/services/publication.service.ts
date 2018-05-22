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

  public getPublicationFromUser(username) {
    return this.http.get(this.serverHost + 'v1/publicacao/user/' + username, {
      headers: this.headers
    });
  }

  public getPublication(id) {
    return this.http.get(this.serverHost + 'v1/publicacao/' + id, {
      headers: this.headers
    });
  }

  public updatePublication(publication) {
    let id = publication._id;
    return this.http.put(this.serverHost + 'v1/publicacao/' + id, JSON.stringify(publication), {
      headers: this.headers
    });
  }

  public getAllPublications() {
    return this.http.get(this.serverHost + 'v1/publicacao', {
      headers: this.headers
    });
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

  public getLikeBorderClass(username, likes) {
    if (likes.includes(username)) {
      return 'red'
    } else {
      return ''
    }
  }

    public getLikeCommentClass(username, likes) {
      if (likes.includes(username)) {
        return 'liked-comment'
      } else {
        return 'unliked-comment'
      }
    }

  public getLikeClass(username, likes) {
    if (likes.includes(username)) {
      return 'liked-btn'
    } else {
      return 'unliked-btn'
    }
  }

  public search (params) {
    return this.http.get(this.serverHost + 'v1/publicacao', {
      headers: this.headers,
      params: {
        orderBy: params.orderBy,
        filterByGenres: params.filterByGenres,

        textSearch: params.textSearch
        skip: params.skip,
        user: params.user
      }
    });
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
