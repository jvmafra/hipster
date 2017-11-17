import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
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
  }

  private registerUser(user) {
    user.birthDate = this.userService.getBirthDate(this.day, this.month, this.year);

    this.userService.registerUser(user).subscribe(
      data => {
        window.location.href = "/user/" + user.username;
      }, err => {
        this.user = {}
        //handle error
        console.log(err);
      }
    );
  }

}
