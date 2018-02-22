import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';

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
  public user;
  public day : string;
  public month : string;
  public year : string;
  public days : Array<number>;
  public months : Array<number>;
  public years : Array<number>;
  private errorInfo: Array<Object>;

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
    this.initSemanticValidationFormInfo();
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
            window.location.href = '/user/' + authUser.user.username;
          }, err => {
            this.alertService.showErrorAlert("Registrar Usuário", "Verifique as informações inseridas e tente novamente.")
          }
        );
      }, err => {
        this.alertService.showErrorAlert("Registrar Usuário", "Verifique as informações inseridas e tente novamente.")
      }
    );

  }

  private isFormValid() {
    return $('.ui.form:nth-child(2)').form('is valid');
  }

  private initDateDropdown() {
    $('.ui.dropdown').dropdown();
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
