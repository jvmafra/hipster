import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { FormValidationService } from '../services/form-validation.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {
  private $ : any;
  private profile: any;
  private events: [any];
  private selected_tab: number = 0;
  private isMyProfile: boolean;

  private name: string;
  private email: string;
  private username: string;
  private foundUser: boolean;
  private day : number;
  private month : number;
  private year : number;
  private days : Array<number>;
  private months : Array<number>;
  private years : Array<number>;
  private errorInfo: Array<Object>;
  private alreadyInit: number;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private userService: UserService,
              private translateService: TranslateService,
              private formValidation: FormValidationService ) {

    this.alreadyInit = 0;
    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');
  }

  public updateProfile() {
    let data = this.formValidation.getFormValidationVariables(this.errorInfo);
    $('.ui.form').form(data);
    let values = $('.ui.dropdown').dropdown('get value');
    this.day = values[2];
    this.month = values[3];
    this.year = values[4];

    if (this.isFormValid()) {

      const usuario = {
        birthDate: this.userService.getBirthDate(this.day, this.month, this.year),
        email: this.email,
        name: this.name,
        username: this.username
      };

      this.userService.updateUser(usuario, this.profile.username).subscribe(
        data => {
          this.userService.storeName(usuario.name);
          window.location.href = "/user/" + this.profile.username;
          $('.ui.success.message').show();
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
    let userBirthDayFormatted = userBirthDay.split("T");
    userBirthDayFormatted = userBirthDayFormatted[0].split("-")

    this.day = userBirthDayFormatted[2];
    this.month = userBirthDayFormatted[1];
    this.year = userBirthDayFormatted[0];

  }

  ngAfterViewChecked() {
    if (this.alreadyInit < 2 && this.selected_tab == 1) {
       $('.ui.dropdown')
         .dropdown()
       ;
       if (this.day < 10) {
         let dayFormatted = "" + this.day;
         $("#day").dropdown("set selected", dayFormatted[1]);

       }

       if (this.month < 10) {
         let monthFormatted = "" + this.month;
         $("#month").dropdown("set selected", monthFormatted[1]);
       }

       $("#year").dropdown("set selected", this.year);

     }

     if (this.selected_tab == 1) { this.alreadyInit += 1 }
     else { this.alreadyInit = 0 }

     return this.selected_tab === 1
  }

  ngOnInit() {
    this.initSemanticValidationForm();

    this.route.params.subscribe(params => {
        let username = params['username'];

        this.isMyProfile = this.userService.compareUsername(username);

        this.userService.retrieveUser(username).subscribe(
          data => {
            this.foundUser = true;
            this.profile = data;
            this.profile.youtube = this.profile.username;
            this.profile.spotify = this.profile.username;
            this.name = this.profile.name;
            this.username = this.profile.username;

            this.initDate(this.profile.birthDate);

            this.email = this.profile.email;
          }, err => {
            this.foundUser = false;
          }
        );
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
