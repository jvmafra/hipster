import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService} from './global.service'
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserService {
  private headers : HttpHeaders;
  private serverHost : String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public registerUser(user) {
    user.birthDate = new Date(user.birthDate);

    return this.http.post(this.serverHost + 'usuario/', JSON.stringify(user), {
      headers: this.headers
    });
  }

  public updateUser(user, username) {
    if (this.isAuthenticated) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.getAccessToken());
    }

    return this.http.put(this.serverHost + 'v1/usuario/' + username, JSON.stringify(user), {
      headers: this.headers
    });
  }

  public retrieveUser(username) {
    if (this.isAuthenticated) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.getAccessToken());
    }

    return this.http.get(this.serverHost + 'v1/usuario/' + username, {
      headers: this.headers
    });
  }

  public loginUser(username, password) {
    let user = {
      username: username,
      password: password
    };

    return this.http.post(this.serverHost + 'login', JSON.stringify(user), {
      headers: this.headers
    });
  }

  public logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('username');

    window.location.href = "";
  }

  public isAuthenticated() {
    let access_token = localStorage.getItem('access_token');
    return access_token;
  }

  public getAccessToken() {
    if (this.isAuthenticated) {
      return localStorage.getItem('access_token');
    } else {
      return undefined;
    }
  }

  public getBirthDateString(birthDate) {
    let splittedBirthDate = birthDate.split("-");
    let year = String(Number(splittedBirthDate[0]));
    let month = String(Number(splittedBirthDate[1]));
    let day = String(Number(splittedBirthDate[2].split("T")[0]));

    return [day, month, year];
  }

  public getBirthDate(day, month, year) {
    let birthDate = "" + month + '/' + day + '/'+  year;

    return new Date(birthDate);
  }

  //@TODO: Analyse if this function would be better in another service
  public getBirthdayYearsArray(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while ( startYear <= currentYear ) {
      years.push(startYear++);
    }

    return years;
  }

}
