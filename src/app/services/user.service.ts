import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service'
import { StorageService } from './storage.service'
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private headers : HttpHeaders;
  private serverHost : String;
  private colors: any = {
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
    'g': 'black'
  };

  constructor(private http: HttpClient,
              private globalService: GlobalService,
              private storageService: StorageService,
              private router: Router) {

    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.serverHost = globalService.getServerHost();
  }

  public getColor(genre){
    return this.colors[genre];
  }

  public registerUser(user) {
    user.birthDate = new Date(user.birthDate);

    return this.http.post(this.serverHost + 'usuario/', JSON.stringify(user), {
      headers: this.headers
    });
  }

  public updateUser(user, username) {
    return this.http.put(this.serverHost + 'v1/usuario', JSON.stringify(user), {
      headers: this.headers
    });
  }

  public retrieveUser(username) {
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

  public storeUser(authUser) {
    this.storageService.storeUser(authUser);
  }

  public storeName(name) {
    this.storageService.storeName(name);
  }

  public storePhotoUrl(photoUrl) {
    this.storageService.storePhotoUrl(photoUrl);
  }

  public compareUsername(username) {
    return this.getStoreUsername() === username;
  }

  public getStoreName() {
    return this.storageService.getStoreName();
  }

  public getStorePhotoUrl() {
    return this.storageService.getStorePhotoUrl();
  }

  public deleteUser() {
    let username = this.getStoreUsername();

    return this.http.delete(this.serverHost + 'v1/usuario', {
      headers: this.headers
    });
  }

  public getStoreUsername() {
    return this.storageService.getStoreUsername();
  }

  public uploadPhoto(photo) {
    const fd = new FormData();
    const username = this.getStoreUsername();
    fd.append("photo", photo, photo.name);
    return this.http.post(this.serverHost + 'v1/usuario/' + username + '/uploadPhoto', fd);
  }

  public logoutUser() {
    this.storageService.removeUser();
    this.router.navigateByUrl('/register');
  }

  public isAuthenticated() {
    return this.storageService.getAccessToken();
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
      years.unshift(startYear++);
    }

    return years;
  }

}
