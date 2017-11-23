import { Component } from '@angular/core';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from './delete-modal/delete-modal.component'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DeleteModalComponent)
  private deleteModal: DeleteModalComponent;

  constructor(private hipsterTranslate: HipsterTranslate,
              private userService: UserService,
              private router: Router){
  }

  public loginUser(username, password) {
    this.userService.loginUser(username, password).subscribe(
      data => {
        let authUser: any = data;
        this.userService.storeUser(authUser);
        window.location.href = '/user/' + authUser.user.username;
      }, err => {
        //TODO: show toast
      }
    );
  }

  public getName() {
    return this.userService.getStoreName();
  }

  public getUsername() {
    return this.userService.getStoreUsername();
  }

  public logoutUser(username, password) {
    this.userService.logoutUser();
  }

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }

  public change(event) {
    window.location.href = '/user/' + this.getUsername();
  }

}
