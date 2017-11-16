import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPostComponent implements OnInit {

  @Input() event;

  constructor() { }

  ngOnInit() {
  }

}
