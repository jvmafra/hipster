import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {

  private post: any;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        let postId = params['id'];

        this.post = {
          id: 0,
          owner_username: "gab",
          url: "https://www.youtube.com/watch?v=mN1hJXzJyNU",
          title: "HONNE - SOMEONE THAT LOVES YOU | A COLORS SHOW",
          description: "We had the great pleasure to welcome HONNE in our studio! The UK electro-soul duo brought the wonderful Naomi along to perform their new single 'Someone That Loves You' (release date: 22.7.)!",
          creationDate: "28/11/2017",
          genres: ["Pop"],
          aproves: ["gab", "rafa", "gila", "mafra", "job", "guga"]
        };

        var url = this.post.url;
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        this.post.videoId = videoid[1]
        $('.ui.embed').embed({
          source      : 'youtube',
          id          : this.post.videoId,
          icon        : 'video'
        });
    });
  }

  getClass(genre) {
    return this.userService.getColor(genre);
  }

}
