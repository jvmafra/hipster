import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { PublicationService } from '../services/publication.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {

  @ViewChild(FeedbackModalComponent)
  public feedbackModal: FeedbackModalComponent;

  public post;
  public user_title: string = undefined;
  public creationDate: string;
  public seeMore = false;
  public comment: any;

  private OPTIONAL_TITLE = 1;
  private MUSIC_NAME = 0;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private publicationService: PublicationService,
              private alertService: AlertService,
              private router: Router) {
    this.post = {};
    this.comment = {};
    this.post["likes"] = [];
  }

  ngOnInit() {
    this.alertService.showLoadIndication();

    this.route.params.subscribe(params => {
        let postId = params['id'];
        let loggedUser = this.userService.getStoreUsername();

        this.publicationService.getPublication(postId, loggedUser).subscribe(
          data => {
            data = data[0];
            this.post = data;
            let titles = this.post.title.split(" HIPSTER_FLAG ")
            this.post.music_name = titles[this.MUSIC_NAME];
            this.user_title = titles[this.OPTIONAL_TITLE];
            this.post.title = titles[this.OPTIONAL_TITLE] === "" ? this.post.music_name : this.user_title;
            let date = new Date(this.post.creationDate);
            this.creationDate = date.toLocaleString();
            var url = this.post.url;
            this.initEmbedYotubue(this.post.videoID);
            this.alertService.hideLoadIndication();

          }, err => {
            this.alertService.hideLoadIndication();
            console.log(err)
          }
        );
    });
  }

  public goToUserPage(username) {
    this.router.navigateByUrl('/user/' + username);
  }

  private initEmbedYotubue(videoID) {
    $('.ui.embed').embed({
      source      : 'youtube',
      id          : videoID,
      icon        : 'video'
    });
  }

  public likePost() {
    let username = window.localStorage.username

    if (this.post.likes.includes(username)) {
      var index = this.post.likes.indexOf(username, 0);
      if (index > -1) {
         this.post.likes.splice(index, 1);
      }
    } else {
      this.post.likes.push(username);
    }

    let updatedPost = {
      likes : this.post.likes,
      _id: this.post._id
    }

    this.publicationService.updatePublication(updatedPost).subscribe(
      data => {}, err => {}
    );

  }

  public getLikeBorderClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeBorderClass(username, this.post.likes);
  }

  public getLikeClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeClass(username, this.post.likes);
  }

  private getClass(genre) {
    return this.userService.getColor(genre);
  }


  private seeMoreComments() {
    this.seeMore = !this.seeMore;
  }

  /**
   * Habilita a publicação do comentario utilizando a tecla ENTER
   */
  public onSubmit(e) {
      if (e.keyCode == 13) {
          this.postComment();
      }
  }

  /**
   * Regista o novo comentario feito pelo usuario com todas as sua informacoes associadas e atualiza
   * a publicacao.
   */
  public postComment() {
    let username = window.localStorage.username

    if (this.comment.description.trim()) {
      this.comment.ownerUsername = username;

      let newComment = {
        ownerUsername: username,
        description: this.comment.description,
        likes: [],
        creationDate: new Date()
      };

      this.post.comments.unshift(newComment);

      let updatedPost = {
        _id: this.post._id,
        comments: this.post.comments
      }

      this.publicationService.updatePublication(updatedPost).subscribe(
        data => {
          this.comment = {
            description:  ""
          };
        }, err => {}
      );
    }

  }

}
