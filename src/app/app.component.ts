import { Component } from '@angular/core';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private hipsterTranslate: HipsterTranslate,
              private userService: UserService){
  }

  loginUser(username, password) {
    this.userService.loginUser(username, password).subscribe(
      data => {
        let authUser: any = data;
        localStorage.setItem('access_token', authUser.token);
        localStorage.setItem('username', authUser.user.username);
        localStorage.setItem('name', authUser.user.name);
        window.location.href = "/user/" + authUser.user.username;
      }, err => {
        //TODO: show toast
      }
    );
  }

  getName() {
    return localStorage.getItem('name');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logoutUser(username, password) {
    this.userService.logoutUser();
  }

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }

}
