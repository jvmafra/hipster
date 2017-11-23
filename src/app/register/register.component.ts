import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormValidationService } from '../services/form-validation.service';
import { TranslateService } from '@ngx-translate/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  private $ : any;
  private user : Object;
  private day : String;
  private month : String;
  private year : String;
  private days : Array<number>;
  private months : Array<number>;
  private years : Array<number>;
  private errorInfo: Array<Object>;

  constructor(private http: HttpClient,
              private userService: UserService,
              private formValidation: FormValidationService,
              private translate: TranslateService ) {

    this.user = {};
    this.day = 'day';
    this.month = 'month';
    this.year = 'year'
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');

  }

  ngOnInit() {
    this.initSemanticValidationForm();
  }

  private registerUser(user) {
    let data = this.formValidation.getFormValidationVariables(this.errorInfo);

    $('.ui.form').form(data);

    user.birthDate = this.userService.getBirthDate(this.day, this.month, this.year);
    this.userService.registerUser(user).subscribe(
      data => {
        this.userService.loginUser(user.username, user.password).subscribe(
          data => {
            let authUser: any = data;
            this.userService.storeUser(authUser);
            window.location.href = "/user/" + authUser.user.username;
          }, err => {
            //TODO: show toast
          }
        );
      }, err => {
        console.log(err);
      }
    );
  }

  private registeraUser(user) {
    let data = this.formValidation.getFormValidationVariables(this.errorInfo);

    $('.ui.form').form(data);

    user.birthDate = this.userService.getBirthDate(this.day, this.month, this.year);

    if (this.isFormValid()) {
      this.userService.registerUser(user).subscribe(
        data => { window.location.href = "/user/" + user.username;},
        err => {console.log(err);}
      );
    }

  }

  private isFormValid() {
    return false
  }

  private initSemanticValidationForm() {
    this.errorInfo = [{"input": "day", errors: ['not[day]'], prompt : ["ERRORS.REGISTER.DAY"]},
                      {"input": "month", errors: ['not[month]'], prompt : ["ERRORS.REGISTER.MONTH"]},
                      {"input": "year", errors: ['not[year]'], prompt : ["ERRORS.REGISTER.YEAR"]},
                      {"input": "name", errors: ['empty'], prompt : ["ERRORS.REGISTER.NAME"]},
                      {"input": "email", errors: ['empty'], prompt : ["ERRORS.REGISTER.EMAIL"]},
                      {"input": "username", errors: ['empty'], prompt : ["ERRORS.REGISTER.USERNAME"]},
                      {"input": "password", errors: ['empty'], prompt : ["ERRORS.REGISTER.PASSWORD"]}]
  }

}
