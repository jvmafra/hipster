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
  private user = {};
  private day = '';
  private month = '';
  private year = '';
  private days = Array.from(Array(31).keys())
  private months = Array.from(Array(12).keys())
  private years = this.userService.getYearsArray('1905');

  constructor(private http: HttpClient,
              private userService: UserService,
              private elementRef: ElementRef) { }

  ngOnInit() {
  }

  private registerUser(user) {
    user.birthDate = "" + this.month + '/' + this.day + '/'+  this.year;

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
