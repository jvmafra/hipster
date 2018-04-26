import { Component, OnInit } from '@angular/core';
import { HipsterTranslate } from './services/hipster-translate.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ViewChild } from '@angular/core';
import { AlertService } from './services/alert.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  public deleteModal: DeleteModalComponent;

  public selectedLanguage: string;

  constructor(private hipsterTranslate: HipsterTranslate,
              public userService: UserService,
              private router: Router,
              private alertService: AlertService){
  }

  ngOnInit() {
    $('#language-dropdown').dropdown();
    this.selectedLanguage = this.hipsterTranslate.getFormattedLanguage();
  }

  private loginUser(username, password) {
    this.userService.loginUser(username, password).subscribe(
      data => {
        let authUser: any = data;
        this.userService.storeUser(authUser);
        this.router.navigateByUrl('/user/' + authUser.user.username);
      }, err => {
        this.alertService.showErrorAlert("Autenticar Usuário", "Usuário ou Senha não encontrados")
      }
    );
  }

  private getName() {
    return this.userService.getStoreName();
  }

  private getUsername() {
    return this.userService.getStoreUsername();
  }

  private logoutUser(username, password) {
    this.userService.logoutUser();
  }

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }

  private change(event) {
    this.router.navigateByUrl('/user/' + this.getUsername());
  }

}
