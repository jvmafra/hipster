import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';
import { HipsterTranslate } from "../services/hipster-translate.service";
import { TermsConditionsModalComponent } from '../terms-conditions-modal/terms-conditions-modal.component'

declare let jquery: any;
declare let $: any;
declare let firebase: any;

const REGISTER_TRANSLATE = "ERRORS.REGISTER.";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild(TermsConditionsModalComponent)
  public termsConditions: TermsConditionsModalComponent;
  private $: any;
  public user;
  public day: string;
  public month: string;
  public year: string;
  public days: Array<number>;
  public months: Array<number>;
  public years: Array<number>;
  private errorInfo: Array<Object>;
  private provider: any;
  private self: any;
  public registering;

  constructor(private http: HttpClient,
              private userService: UserService,
              private formValidation: FormValidationService,
              private translateService: TranslateService,
              private hipsterTranslate: HipsterTranslate,
              private router: Router,
              private alertService: AlertService) {
    this.user = {};
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');
    this.registering = false;
  }

  ngOnInit() {

    this.initCheckbox();
    this.initSemanticValidationFormInfo();
  }

  ngAfterViewInit() {
    this.initDateDropdown();
  }

  public setUpProfile(email, birthday, name) {

    this.user.name = name;
    this.user.email = email;

    if (birthday) {
      this.day = '' + parseInt(birthday.split("/")[1]);
      this.month = '' + parseInt(birthday.split("/")[0]);
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
        this.registering = true;
      }, err => {
        let message = "";

        if (err.error === "VALIDACAO_ACTIVE_EMAIL") {
          message = this.hipsterTranslate.translateItem(REGISTER_TRANSLATE + err.error);
        } else if (err.error === "DUPLICATED_USERNAME") {
          message = this.hipsterTranslate.translateItem(REGISTER_TRANSLATE + err.error);
        } else {
          message = this.hipsterTranslate.translateItem(REGISTER_TRANSLATE + "ERROR_MESSAGE");
        }

        let errorTitle = this.hipsterTranslate.translateItem(REGISTER_TRANSLATE + "ERROR_MESSAGE_TITLE");
        this.alertService.showErrorAlert(errorTitle, message);
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
    const values = $('.ui.dropdown').dropdown('get value');
    this.day = values[1];
    this.month = values[2];
    this.year = values[3];
  }

}
