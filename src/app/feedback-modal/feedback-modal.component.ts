import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackModalComponent implements OnInit {
  private $ : any;

  constructor() { }

  ngOnInit() {
  }

  public sendFeedbackModal(event) {
    $('#feedback-modal').modal('show');
    event.stopPropagation();
  }

}
