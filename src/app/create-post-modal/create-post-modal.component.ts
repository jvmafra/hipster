import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public createPostModal(event) {
    $('.ui.modal').modal({
      onDeny    : function() { return true;},
      onApprove : () => { this.createPost() }
    })
    .modal('show');

    event.stopPropagation();
  }

  private createPost() {

  }

}
