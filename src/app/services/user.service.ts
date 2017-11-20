import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService} from './global.service'

@Injectable()
export class UserService {
  private headers : HttpHeaders;
  private serverHost : String;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {

    this.headers = new HttpHeaders().set('Authorization', 'my-auth-token').set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public registerUser(user) {
    user.birthDate = new Date(user.birthDate);

    return this.http.post(this.serverHost + 'usuario', JSON.stringify(user), {
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
