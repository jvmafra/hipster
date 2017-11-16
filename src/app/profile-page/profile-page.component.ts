import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {

  profile: any;
  events: [any];
  selected_tab: number = 0;

  name: string;
  email: string;
  username: string;
  birthDate: string;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private http: HttpClient) {}

  updateProfile() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    const usuario = {
      dataNascimento: this.birthDate,
      email: this.email,
      nome: this.name,
      username: this.username
    };

    this.http.put('http://127.0.0.1:3000/api/usuario/' + this.profile.username, JSON.stringify(usuario), {
      headers: headers
    }).subscribe(data => {
      this.profile = data
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        let username = params['username'];

        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

        this.http.get('http://127.0.0.1:3000/api/usuario/' + username, {
          headers: headers
        }).subscribe(data => {
          this.profile = data;
          this.profile.youtube = this.profile.username
          this.profile.spotify = this.profile.username
          this.name = this.profile.nome;
          this.username = this.profile.username;
          this.birthDate = this.profile.dataNascimento;
          this.email = this.profile.email;

        });
     });

     this.events = [
       {
         title: "Musica top de teste",
         date: "2 days ago",
         likes: "41",
         comments: [
           {
             owner: {
               name: "Gabriel Guimarães",
               img: "../assets/elliot.jpg"
             },
             text: "Prefiro molejo",
             comments: [
               {
                 owner: {
                   name: "Gustavo Henrique",
                   img: "../assets/elliot.jpg"
                 },
                 text: "Ah, é bom demais!"
               }
             ]
           },
           {
             owner: {
               name: "Rafael Albuquerque",
               img: "../assets/jenny.jpg"
             },
             text: "Olha a fera aí, meu. EEEGA",
             comments: [
               {
                 owner: {
                   name: "Mafraboy",
                   img: "../assets/jenny.jpg"
                 },
                 text: "O bixo é tão bom que deu vontade de ir beber"
               },
               {
                 owner: {
                   name: "Gilekel",
                   img: "../assets/elliot.jpg"
                 },
                 text: "Kkkkkkkk esse bixo é doido"
               }
             ]
           }
         ]
       },
       {
         title: "Gilekel's Song",
         date: "4 days ago",
         likes: "31",
         comments: [
           {
             owner: {
               name: "Joabson",
               img: "../assets/jenny.jpg"
             },
             text: "A discussão acerca dos direitos humanos parece-me uma importante contribuição que aqueles que se dedicam à filosofia política podem dar ao mundo contemporâneo globalizado e interdependente. Analisando idéias e concepções que parecem óbvias ou irretorquíveis e por meio do diálogo acadêmico interdisciplinar e com as pessoas em geral, podemos buscar maior clareza acerca dos fundamentos da ação humana. Não se trata de oferecer respostas, mas de pensar e falar publicamente sobre a inserção e a responsabilidade das pessoas no mundo. Eis, portanto, o propósito de minha exposição: tendo como base a Declaração Universal dos Direitos Humanos de 1948, convido-os para conversarmos sobre o que nos faz agir. Ou, mais precisamente, sobre o agir em comum – uns com os outros – de modo que todos possam participar integrando-se à comunidade. Iniciarei investigando alguns artigos da Declaração, buscando discernir o que deve nortear as ações de cada pessoa.",
             comments: []
           }
         ]
       }
     ]

  }
}
