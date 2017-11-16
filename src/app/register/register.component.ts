import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  $('.dropdown').dropdown();

  private birthDate: string;
  private email: string;
  private name: string;
  private password: string;
  private username: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  private getUserForm() {
    return  {
      dataNascimento: this.birthDate,
      email: this.email,
      nome: this.name,
      senha: this.password,
      username: this.username
    };
  }

  registerUser() {
    const usuario = this.getUserForm();

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://127.0.0.1:3000/api/usuario', JSON.stringify(usuario), {
      headers: headers
    }).subscribe(data => {
      console.log(data);
    });

    this.finishRegister();
  }

  private clearRegisterForm() {
    this.birthDate = '';
    this.email = '';
    this.name = '';
    this.username = '';
    this.password = '';
  }

  finishRegister() {
    this.clearRegisterForm();
  }
}
