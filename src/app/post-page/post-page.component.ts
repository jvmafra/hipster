import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { PublicationService } from '../services/publication.service';

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
              private userService: UserService,
              private publicationService: PublicationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        let postId = params['id'];

        this.publicationService.getPublication(postId).subscribe(
          data => {
            this.post = data;

            let titles = this.post.title.split(" HIPSTER_FLAG ")
            this.post["music_name"] = titles[0]
            this.post["user_title"] = titles[1]

            if (titles[1] === "undefined") {
              this.post.title = this.post.music_name
            } else {
              this.post.title = this.post.user_title
            }

            var url = this.post.url;
            var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            this.post.videoId = videoid[1]
            $('.ui.embed').embed({
              source      : 'youtube',
              id          : this.post.videoId,
              icon        : 'video'
            });
          }, err => {
            console.log(err)
          }
        );


    });
  }

  getClass(genre) {
    return this.userService.getColor(genre);
  }

}
