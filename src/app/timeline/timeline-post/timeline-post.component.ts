import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';

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

  private title: string;
  private subtitle: string;
  private creationDate: string;

  constructor(private userService: UserService,
              private publicationService: PublicationService) {
  }

  openPost() {
    window.location.href = "/post/" + this.event._id
  }

  getClass(genre) {
    return this.userService.getColor(genre);
  }

  likePost() {
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

  getLikeBorderClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeBorderClass(username, this.event.likes);
  }

  getLikeClass() {
    let username = window.localStorage.username
    return this.publicationService.getLikeClass(username, this.event.likes);
  }

  ngOnInit() {
    var url = this.event.url;
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    this.event.thumbnail = "https://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg"
    this.event.videoId = videoid[1]

    let date = new Date(this.event.creationDate);
    this.creationDate = date.toLocaleString();

    let titles = this.event.title.split(" HIPSTER_FLAG ")
    this.subtitle = titles[0]
    this.title = titles[1]

    if (titles[1] === "undefined") {
      this.title = this.subtitle
    }
  }

}
