import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';
import { TermsConditionsModalComponent } from '../terms-conditions-modal/terms-conditions-modal.component'

declare var jquery:any;
declare var $ :any;
declare var firebase: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  @ViewChild(TermsConditionsModalComponent)
  public termsConditions: TermsConditionsModalComponent;
  private $ : any;
  public user;
  public day : string;
  public month : string;
  public year : string;
  public days : Array<number>;
  public months : Array<number>;
  public years : Array<number>;
  private errorInfo: Array<Object>;
  private provider : any;
  private self: any;

  constructor(private http: HttpClient,
              private userService: UserService,
              private formValidation: FormValidationService,
              private translateService: TranslateService,
              private router: Router,
              private alertService: AlertService) {
    this.user = {};
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');

  }

  ngOnInit() {
    this.initDateDropdown();
    this.initCheckbox();
    this.initSemanticValidationFormInfo();
  }

  private loginWithGoogle(callback: (email, birthday, name)=>void) {
    this.provider = new firebase.auth.GoogleAuthProvider();

    this.provider.addScope('profile');
    this.provider.addScope('email');
    this.provider.addScope('https://www.googleapis.com/auth/user.birthday.read');

    this.provider.setCustomParameters({
      'display': 'popup'
    });

    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var profile = result.additionalUserInfo.profile;
      // ...
      var email = profile.email;
      var birthday = profile.birthday;
      var name = profile.name;

      callback(email, birthday, name);

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  private loginWithFacebook(callback: (email, birthday, name)=>void) {
    this.provider = new firebase.auth.FacebookAuthProvider();

    this.provider.addScope('user_birthday');
    this.provider.addScope('email');
    this.provider.addScope('public_profile');

    this.provider.setCustomParameters({
      'display': 'popup'
    });

    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var profile = result.additionalUserInfo.profile;
      // ...
      var email = profile.email;
      var birthday = profile.birthday;
      var name = profile.name;

      callback(email, birthday, name);

    }).catch(function(error) {
      console.log(error);
    });
  }

  loginGoogle() {
    this.loginWithGoogle(this.setUpProfile.bind(this));
  }

  loginFB() {
    this.loginWithFacebook(this.setUpProfile.bind(this));
  }

  public setUpProfile(email, birthday, name) {

    this.user.name = name;
    this.user.email = email;

    if (birthday) {
      this.day = "" + parseInt(birthday.split("/")[1]);
      this.month = "" + parseInt(birthday.split("/")[0]);
      this.year = birthday.split("/")[2];
      $("#day_r").dropdown("set selected", this.day);
      $("#month_r").dropdown("set selected", this.month);
      $("#year_r").dropdown("set selected", this.year);
    }

    $("#username_r").focus().select().click();
  }

  public registerUser(user, event) {
    this.initSemanticValidationForm();
    this.setDateValuesFromDropdown();
    user.birthDate = this.userService.getBirthDate(this.day, this.month, this.year);

    this.userService.registerUser(user).subscribe(
      data => {
        this.userService.loginUser(user.username, user.password).subscribe(
          data => {
            this.alertService.showSuccessAlert("Registrar Usuário", "Usuário registrado com sucesso!")
            let authUser: any = data;
            this.userService.storeUser(authUser);
            this.router.navigateByUrl('/user/' + authUser.user.username);
          }, err => {
            this.alertService.showErrorAlert("Registrar Usuário", "Verifique as informações inseridas e tente novamente.")
          }
        );
      }, err => {
        this.alertService.showErrorAlert("Registrar Usuário", "Verifique as informações inseridas e tente novamente.")
      }
    );

  }

  private enableRegister() {
    return $('#toggle-terms').checkbox('is checked');
  }

  private initCheckbox() {
    $('#toggle-terms').checkbox();
  }

  private isFormValid() {
    return $('.ui.form:nth-child(2)').form('is valid');
  }

  private initDateDropdown() {
    $('.ui.dropdown').dropdown();
    $('#day_r').dropdown();
    $('#month_r').dropdown();
    $('#year_r').dropdown();
  }

  private initSemanticValidationFormInfo() {
    this.errorInfo = [{"input": "day", errors: ['not[day]'], prompt : ["ERRORS.REGISTER.DAY"]},
                      {"input": "month", errors: ['not[month]'], prompt : ["ERRORS.REGISTER.MONTH"]},
                      {"input": "year", errors: ['not[year]'], prompt : ["ERRORS.REGISTER.YEAR"]},
                      {"input": "name", errors: ['empty'], prompt : ["ERRORS.REGISTER.NAME"]},
                      {"input": "email", errors: ['empty'], prompt : ["ERRORS.REGISTER.EMAIL"]},
                      {"input": "username", errors: ['empty'], prompt : ["ERRORS.REGISTER.USERNAME"]},
                      {"input": "password", errors: ['empty'], prompt : ["ERRORS.REGISTER.PASSWORD"]}]
  }

  private initSemanticValidationForm() {
    let data = this.formValidation.getFormValidationVariables(this.errorInfo);
    $('.ui.form:nth-child(2)').form(data);
  }

  private setDateValuesFromDropdown() {
    let values = $('.ui.dropdown').dropdown('get value');
    this.day = values[1];
    this.month = values[2];
    this.year = values[3];
  }

}
