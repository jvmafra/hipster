import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TermsConditionsModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }  

  public termsConditionsModal(event) {

    $('#terms-conditions').modal({
      onDeny    : function() { return true;}
    })
    .modal('setting', 'closable', false)
    .modal('show');

    event.stopPropagation();
  }

}
