import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private headers = new HttpHeaders().set('Authorization', 'my-auth-token').set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  public registerUser(user) {
    console.log(user.birthDate)
    user.birthDate = new Date(user.birthDate);
    console.log(user.birthDate)
    return this.http.post('http://127.0.0.1:3000/api/usuario', JSON.stringify(user), {
      headers: this.headers
    });
  }

  public getYearsArray(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while ( startYear <= currentYear ) {
      years.push(startYear++);
    }

    return years;
  }


}
