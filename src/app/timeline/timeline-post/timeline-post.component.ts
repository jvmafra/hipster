import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

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

  constructor() {
  }

  private colors: any = {
    'Pop': 'red',
    'Rock': 'orange',
    'Funk': 'yellow',
    'Rap': 'olive',
    'Reggae': 'green',
    'Classic': 'teal',
    'b': 'blue',
    'c': 'violet',
    'd': 'purple',
    'e': 'pink',
    'f': 'brown',
    'g': 'grey',
    'h': 'black'
  };

  getClass(genre) {
    return this.colors[genre];
  }

  ngOnInit() { }

}
