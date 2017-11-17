import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private headers = new HttpHeaders().set('Authorization', 'my-auth-token').set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  public registerUser(user) {
    user.birthDate = new Date(user.birthDate);

    return this.http.post('http://127.0.0.1:3000/api/usuario', JSON.stringify(user), {
      headers: this.headers
    });
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
