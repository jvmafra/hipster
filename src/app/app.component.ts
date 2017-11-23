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
        this.userService.storeUser(authUser);
        window.location.href = "/user/" + authUser.user.username;
      }, err => {
        //TODO: show toast
      }
    );
  }

  getName() {
    return this.userService.getStoreName();
  }

  getUsername() {
    return this.userService.getStoreUsername();
  }

  logoutUser(username, password) {
    this.userService.logoutUser();
  }

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }

}
