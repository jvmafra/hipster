import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { HipsterTranslate } from '../../services/hipster-translate.service';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-timeline-post',
  templateUrl: './timeline-post.component.html',
  styleUrls: ['./timeline-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelinePostComponent implements OnInit {

  @Input() event;
  public title: string;
  public user_title: string;
  public customPostID: string;

  public subtitle: string;
  public creationDate: string;
  private OPTIONAL_TITLE = 1;
  private MUSIC_NAME = 0;
  private seeMore = false;
  private comment;

  constructor(private userService: UserService,
              private publicationService: PublicationService,
              private router: Router) {

      this.comment = {};
  }

  public goToUserPage(username) {
    this.router.navigateByUrl('/user/' + username);
  }

  public openPost() {
    this.router.navigateByUrl('/post/' + this.event._id);
  }

  ngAfterViewInit() {
    this.customPostID = this.event.ownerUsername + this.event.creationDate.replace(/[^a-z0-9]/gi,'') + this.event.videoID;
    this.initEmbedYoutube(this.customPostID);
  }

  private seeMoreComments() {
    this.seeMore = !this.seeMore;

    if (!this.seeMore) {

    } else {

    }

  }

  private onSubmit(e) {
      if (e.keyCode == 13) {
          this.postComment();
      }
  }

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

      this.event.comments.push(newComment);

      let updatedPost = {
        _id: this.event._id,
        comments: this.event.comments
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

  private getClass(genre) {
    return this.userService.getColor(genre);
  }

  public likePost() {

    let username = window.localStorage.username

    if (this.event.likes.includes(username)) {
      var index = this.event.likes.indexOf(username, 0);
      if (index > -1) {
         this.event.likes.splice(index, 1);
      }
    } else {
      this.event.likes.push(username);
    }

    let updatedPost = {
      likes : this.event.likes,
      _id: this.event._id
    }

    this.publicationService.updatePublication(updatedPost).subscribe(
      data => {}, err => {}
    );

  }

  private initEmbedYoutube(hashID) {
    $('#' + hashID).embed();
  }

  public getLikeBorderClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeBorderClass(username, this.event.likes);
  }

  public getLikeClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeClass(username, this.event.likes);
  }

  ngOnInit() {
    var url = this.event.url;
    let date = new Date(this.event.creationDate);
    this.creationDate = date.toLocaleString();
    let titles =  this.event.title.split(" HIPSTER_FLAG ")
    this.subtitle = titles[this.MUSIC_NAME];
    this.user_title = titles[this.OPTIONAL_TITLE];
    this.title = titles[this.OPTIONAL_TITLE] === "" ? this.subtitle : this.user_title;

    this.customPostID = this.event.ownerUsername + this.event.creationDate.replace(/[^a-z0-9]/gi,'') + this.event.videoID;
    this.initEmbedYoutube(this.customPostID);

  }

}
