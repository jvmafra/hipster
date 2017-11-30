import { Component, OnInit } from '@angular/core';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from './delete-modal/delete-modal.component'
import { ViewChild } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private deleteModal: DeleteModalComponent;
  private selectedLanguage: string;

  constructor(private hipsterTranslate: HipsterTranslate,
              private userService: UserService,
              private router: Router){
  }

  ngOnInit() {
    $('#language-dropdown').dropdown();
    this.selectedLanguage = this.hipsterTranslate.getFormattedLanguage();
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
