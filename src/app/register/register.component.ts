import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  mostrarInfoSenha() {
    this.passwordElemIsHover = true;
  }

  esconderInfoSenha() {
    this.passwordElemIsHover = false;
  }

  private getDadosUsuario() {
    return  {
      dataNascimento: this.dataNascimento,
      email: this.email,
      nome: this.nome,
      senha: this.senha,
      username: this.username
    };
  }

  fazerPostDosDados() {
    const usuario = this.getDadosUsuario();

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://127.0.0.1:3000/api/usuario', JSON.stringify(usuario), {
      headers: headers
    }).subscribe(data => {
      console.log(data);
    });

    this.finalizarCadastro();
  }

  private limparCamposDoForm() {
    this.dataNascimento = '';
    this.email = '';
    this.nome = '';
    this.username = '';
    this.senha = '';
  }

  abrirCadastro() {
    document.getElementById('myNav').style.height = '100%';
  }

  fecharCadastro() {
  document.getElementById('myNav').style.height = '0%';
  }

  finalizarCadastro() {
    this.fecharCadastro();
    this.limparCamposDoForm();
  }
}
