import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { PublicationService } from '../services/publication.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {
  private $: any;
  private profile: any;
  private events: any;
  private selected_tab: number = 0;
  private isMyProfile: boolean;

  private name: string;
  private email: string;
  private username: string;
  private foundUser: boolean;
  private day: number;
  private month: number;
  private year: number;
  private days: Array<number>;
  private months: Array<number>;
  private years: Array<number>;
  private errorInfo: Array<Object>;
  private alreadyInit: number;
  private ytURL: string;
  private spotifyURL: string;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private userService: UserService,
              private translateService: TranslateService,
              private publicationService: PublicationService,
              private formValidation: FormValidationService ) {

    this.alreadyInit = 0;
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');
  }

  public updateProfile() {
    const data = this.formValidation.getFormValidationVariables(this.errorInfo);
    $('.ui.form').form(data);
    const values = $('.ui.dropdown').dropdown('get value');
    this.day = values[2];
    this.month = values[3];
    this.year = values[4];

    if (this.isFormValid()) {
      const usuario = {
        birthDate: this.userService.getBirthDate(this.day, this.month, this.year),
        email: this.email,
        name: this.name,
        username: this.username,
        spotifyURL: this.spotifyURL,
        ytURL: this.ytURL
      };
      this.userService.updateUser(usuario, this.profile.username).subscribe(
        data => {
          this.userService.storeName(usuario.name);
          window.location.href = "/user/" + this.profile.username;
        }, err => {
          console.log(err)
          $('.ui.error.message').show();
          if (err.statusText === "Unauthorized") {
            this.userService.logoutUser();
          }
        }
      );
    }
  }

  private isFormValid() {
    return $('.ui.form').form('is valid');
  }

  private initSemanticValidationForm() {
    this.errorInfo = [{"input": "day", errors: ['not[day]'], prompt : ["ERRORS.REGISTER.DAY"]},
                      {"input": "month", errors: ['not[month]'], prompt : ["ERRORS.REGISTER.MONTH"]},
                      {"input": "year", errors: ['not[year]'], prompt : ["ERRORS.REGISTER.YEAR"]},
                      {"input": "name", errors: ['empty'], prompt : ["ERRORS.REGISTER.NAME"]},
                      {"input": "email", errors: ['empty'], prompt : ["ERRORS.REGISTER.EMAIL"]}];
  }

  private initDate(userBirthDay) {
    let userBirthDayFormatted = new Date(userBirthDay);
    this.day = userBirthDayFormatted.getDate();
    this.month = userBirthDayFormatted.getMonth() + 1;
    this.year = userBirthDayFormatted.getFullYear();
  }

  ngAfterViewChecked() {
    if (this.alreadyInit < 2 && this.selected_tab === 1) {
       $('.ui.dropdown')
         .dropdown()
       ;

       $('#day').dropdown('set selected', this.day);
       $('#month').dropdown('set selected', this.month);
       $('#year').dropdown('set selected', this.year);

    }

    if (this.selected_tab === 1) {
      this.alreadyInit += 1;
    } else {
      this.alreadyInit = 0;
    }
    return this.selected_tab === 1;
  }

  ngOnInit() {
    this.initSemanticValidationForm();

    this.route.params.subscribe(params => {
        const username = params['username'];

        this.isMyProfile = this.userService.compareUsername(username);

        this.publicationService.getPublicationFromUser(username).subscribe(
          data => {
            this.events = data;
          }, err => {
            this.foundUser = false;
          }
        );

        this.userService.retrieveUser(username).subscribe(
          data => {
            this.foundUser = true;
            this.profile = data;
            this.ytURL = this.profile.ytURL || '';
            this.spotifyURL = this.profile.spotifyURL || '';
            this.name = this.profile.name;
            this.username = this.profile.username;

            this.initDate(this.profile.birthDate);

            this.email = this.profile.email;

          }, err => {
            this.foundUser = false;
          }
        );
     });

  }
}
