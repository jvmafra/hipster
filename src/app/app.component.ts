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
        console.log(data);
      }, err => {
        //handle error
        //@TODO: Need to do this part
        console.log(err);
      }
    );
  }

  logoutUser(username, password) {
    this.userService.logoutUser();
  }

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }

}
