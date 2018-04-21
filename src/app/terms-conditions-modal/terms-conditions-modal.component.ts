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
  
  terms_safety: any[] = [
    {"text": 'TERMS_CONDITIONS.SAFETY_PART1'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART2'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART3'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART4'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART5'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART6'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART7'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART8'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART9'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART10'},
    {"text": 'TERMS_CONDITIONS.SAFETY_PART11'}
  ]

  terms_privacy: any[] = [
    {"text": 'TERMS_CONDITIONS.PRIVACY_PART1'},
    {"text": 'TERMS_CONDITIONS.PRIVACY_PART2'}
  ]

  terms_responsability: any[] = [
    {"text": 'TERMS_CONDITIONS.RESPONSABILITY_PART1'},
    {"text": 'TERMS_CONDITIONS.RESPONSABILITY_PART2'},
    {"text": 'TERMS_CONDITIONS.RESPONSABILITY_PART3'},
    {"text": 'TERMS_CONDITIONS.RESPONSABILITY_PART4'},
    {"text": 'TERMS_CONDITIONS.RESPONSABILITY_PART5'}
  ]

  public termsConditionsModal(event) {

    $('#terms-conditions').modal({
      onDeny    : function() { return true;}
    })
    .modal('setting', 'closable', false)
    .modal('show');

    event.stopPropagation();
  }

}
