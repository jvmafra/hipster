import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchItemComponent implements OnInit {

  @Input() event;

  constructor() { }

  ngOnInit() {
    this.event["isUser"] = this.event.active;
  }

}
