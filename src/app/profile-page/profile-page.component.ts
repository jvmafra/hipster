import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {

  private profile: any;
  private events: [any];
  private selected_tab: number = 0;
  private isMyProfile: boolean;

  private name: string;
  private email: string;
  private username: string;
  private foundUser: boolean;
  private day: String;
  private month: String;
  private year: String;
  private days: Array<number>;
  private months: Array<number>;
  private years: Array<number>;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private userService: UserService,
              private translateService: TranslateService) {

    translateService.get('REGISTER.DAY').subscribe((res: string) => {
      this.day = res;
    });

    translateService.get('REGISTER.MONTH').subscribe((res: string) => {
      this.month = res;
    });

    translateService.get('REGISTER.YEAR').subscribe((res: string) => {
      this.year = res;
    });

    this.days = Array.from(Array(31).keys());
    this.months = Array.from(Array(12).keys());
    this.years = this.userService.getBirthdayYearsArray('1905');
  }

  public updateProfile() {
    let isValidDate: boolean = true;
    this.translateService.get('REGISTER.DAY').subscribe((res: string) => {
      if (this.day === res) {
        isValidDate = false;
      }
    });

    this.translateService.get('REGISTER.MONTH').subscribe((res: string) => {
      if (this.day === res) {
        isValidDate = false;
      }
    });

    this.translateService.get('REGISTER.YEAR').subscribe((res: string) => {
      if (this.day === res) {
        isValidDate = false;
      }
    });

    if (isValidDate) {
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
        }, err => {
          if (err.statusText === "Unauthorized") {
            this.userService.logoutUser();
          }
        }
      );
    } else {
      console.log("Data invalida");
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        const username = params['username'];

        this.isMyProfile = this.userService.compareUsername(username);

        this.retriveUserBy(username);
     });

    this.events = [
      this.createPost(
        'ROLOU A TROCAÇÃO ASTRAL',
        '1 day ago',
        '150',
        [this.comment(
          'Ordan',
          '../assets/jenny.jpg',
          'Carai mano, rolou mesmo, hein.',
          [this.comment(
            'Jobson',
            '../assets/elliot.jpg',
            'Ordan, o pastor da rebelião')]
        )]
      ),
      this.createPost(
        'Musica top de teste',
        '2 days ago',
        '41',
        [
          this.comment(
            'Gabriel Guimarães',
            '../assets/elliot.jpg',
            'Prefiro molejo',
            [
              this.comment(
                'Gustavo Henrique',
                '../assets/elliot.jpg',
                'Ah, é bom demais!')
            ]
          ),
          this.comment(
            'Rafael Albuquerque',
            '../assets/jenny.jpg',
            'Olha a fera aí, meu. EEEGA',
            [
              this.comment(
                'Mafraboy',
                '../assets/jenny.jpg',
                'O bixo é tão bom que deu vontade de ir beber'),
              this.comment(
                'Gilekel',
                '../assets/elliot.jpg',
                'Kkkkkkkk esse bixo é doido')
            ]
          ),
        ]),
      this.createPost(
        'Gilekel Song',
        '4 days ago',
        '31',
        [
          this.comment(
            'Joabson',
            '../assets/jenny.jpg',
            'A discussão acerca dos direitos humanos parece-me uma importante contribuição ' +
            'que aqueles que se dedicam à filosofia política podem dar ao mundo contemporâneo ' +
            'globalizado e interdependente. Analisando idéias e concepções que parecem óbvias ' +
            'ou irretorquíveis e por meio do diálogo acadêmico interdisciplinar e com as pessoas ' +
            'em geral, podemos buscar maior clareza acerca dos fundamentos da ação humana. ' +
            'Não se trata de oferecer respostas, mas de pensar e falar publicamente sobre a ' +
            'inserção e a responsabilidade das pessoas no mundo. Eis, portanto, o propósito ' +
            'de minha exposição: tendo como base a Declaração Universal dos Direitos Humanos ' +
            'de 1948, convido-os para conversarmos sobre o que nos faz agir. Ou, mais ' +
            'precisamente, sobre o agir em comum – uns com os outros – de modo que todos ' +
            'possam participar integrando-se à comunidade. Iniciarei investigando alguns ' +
            'artigos da Declaração, buscando discernir o que deve nortear as ações de cada pessoa.',
            [
              this.comment(
                'Jobson',
                '../assets/elliot.jpg',
                'Cala a boca, seu filhote de Leprechaun!')
            ]
          ),
        ])
    ];
  }

  private retriveUserBy(username: any) {
    this.userService.retrieveUser(username).subscribe(
      data => {
        this.foundUser = true;
        this.profile = data;
        this.profile.youtube = this.profile.username;
        this.profile.spotify = this.profile.username;
        this.name = this.profile.name;
        this.username = this.profile.username;

        const birthDateArray = this.userService.getBirthDateString(this.profile.birthDate);

        this.day = birthDateArray[0];
        this.month = birthDateArray[1];
        this.year = birthDateArray[2];

        this.email = this.profile.email;
      }, err => {
        this.foundUser = false;
      }
    );
  }

  // @Todo: tanto uma postagem quanto um comentário poderiam ser objetos
  private comment(ownerName, avatar, txt, innerComments?) {
    return {
      owner: {
        name: ownerName,
        img: avatar
      },
      text: txt,
      comments: innerComments || []
    };
  }

  /**
   * Função modelar a criação de uma postagem.
   *
   * @param postTitle(string): título que o post irá receber
   *
   * @param postDate(string): data em que foi feita a postagem
   *
   * @param totalOfLikes(string): número de likes que a postagem recebeu
   *
   * @param postComments(Array<string>): os comentários que o post recebeu(esse parâmetro é opcional)
   *
   * */
  private createPost(postTitle, postDate, totalOfLikes, postComments?) {
    return {
      title: postTitle,
      date: postDate,
      likes: totalOfLikes,
      comments: postComments || []
    };
  }
}
