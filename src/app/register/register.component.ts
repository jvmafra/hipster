import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  private passwordElemIsHover = false;

  @ViewChild
  ('passwordElem') passwordElem: ElementRef;

  private dataNascimento: string;
  private email: string;
  private nome: string;
  private senha: string;
  private username: string;

  constructor() { }

  ngOnInit() {

  }

  showPwdTip() {
    this.passwordElemIsHover = true;
  }

  hidePwdTip() {
    this.passwordElemIsHover = false;
  }

  submit() {
    const usuario = {
      dataNascimento: this.dataNascimento,
      email: this.email,
      nome: this.nome,
      senha: this.senha,
      username: this.username
    };
    console.log(usuario);
  }

  cancel() {

  }
}
