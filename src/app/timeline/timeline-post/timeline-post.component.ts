import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) {}

  openPost() {
    window.location.href = "/post/" + this.event._id
  }

  getClass(genre) {
    return this.userService.getColor(genre);
  }

  ngOnInit() {

    var url = this.event.url;
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    this.event.thumbnail = "https://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg"
    this.event.videoId = videoid[1]

    let titles = this.event.title.split(" HIPSTER_FLAG ")
    this.event.music_name = titles[0]
    this.event.user_title = titles[1]

    if (titles[1] === "undefined") {
      this.event.title = this.event.music_name
    } else {
      this.event.title = this.event.user_title
    }
  }

}
