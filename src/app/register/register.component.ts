import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
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

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.user = {};
    this.day = 'Day';
    this.month = 'Month';
    this.year = 'Year'
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');

  }

  ngOnInit() {
    this.initSemanticValidationForm();
  }

  private registerUser(user) {
    user.birthDate = this.userService.getBirthDate(this.day, this.month, this.year);

    if ($('form').form('is valid')) {
      this.userService.registerUser(user).subscribe(
        data => {
          window.location.href = "/user/" + user.username;
        }, err => {
          //handle error
          //@TODO: Need to do this part
          console.log(err);
        }
      );
    } else {
    }
  }

  private initSemanticValidationForm() {
    $('.ui.form')
    .form({
      inline : true,
      fields: {
        name: {
          rules: [
          {
            type   : 'empty',
            prompt : "fff"
          }
          ]
        },
        username: {
          rules: [
          {
            type   : 'empty',
            prompty: 'message'
          }
          ]
        },
        email: {
          rules: [
          {
            type   : 'empty',
            prompty: 'message'
          }
          ]
        },
        password: {
          rules: [
          {
            type   : 'empty',
            prompty: 'message'
          }
          ]
        },
      }
    });


  }

}
