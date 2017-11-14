import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {

  profile: string;
  events: [any] = [];
  selected_tab: number = 0;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        let username = params['username'];
        this.profile = {
          username: username,
          youtube: username,
          spotify: username,
          email: "hipster@gmail.com",
          data_nascimento: "01/06/1990",
          data_criacao: "13/11/2017"
        }
     });

     this.events = [
       {
         title: "You posted <a>Rafael's Song</a>",
         date: "2 days ago",
         likes: "41 Likes"
       },
       {
         title: "You posted <a>Gilekel's Song</a>",
         date: "4 days ago",
         likes: "31 Likes"
       },
       {
         title: "You posted <a>Mafraboy's Song</a>",
         date: "5 days ago",
         likes: "67 Likes"
       },
     ]

  }

}
