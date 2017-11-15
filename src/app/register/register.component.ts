import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  passwordIsFocused = false;

  @ViewChild
  ('password') password: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  showPwdTip() {
    this.passwordIsFocused = true;
  }

  hidePwdTip() {
    this.passwordIsFocused = false;
  }

}
