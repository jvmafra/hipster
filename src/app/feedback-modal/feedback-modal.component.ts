import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ReportService } from '../services/report.service';
import { UserService } from '../services/user.service';
import { HipsterTranslate } from "../services/hipster-translate.service";


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
  private reportedUser: string;
  private videoIDreported: string;
  private report;
  public requestErrors: Array<string>;

  constructor(private reportService: ReportService,
    private userService: UserService,
    private hipsterTranslate: HipsterTranslate) {
    this.report = {};
    this.reportedUser = '';
    this.videoIDreported = '';

   }

  ngOnInit() {
    this.requestErrors = [];
  }

  public sendFeedbackModal(event, post) {
    this.reportedUser = post.ownerUsername;
    this.videoIDreported = post.videoID;
    console.log(post.ownerUsername);
    console.log(post.videoID);
    console.log(this.reportedUser);
    console.log(this.videoIDreported);
    $('#feedback-modal').modal('show');
    event.stopPropagation();
  }

  public sendReport(){
    let username = window.localStorage.username;

    console.log(this.reportedUser);
    console.log(this.videoIDreported);

    let reportToBeSent = {
      ownerUsername: username,
      reportedUser: this.reportedUser,
      videoIDreported: this.videoIDreported,
      description: this.report.description,
      reportDate: new Date()

    };

    console.log(reportToBeSent);

    this.reportService.saveReport(reportToBeSent).subscribe(
      data => {
        console.log("Success");
      }, err => {                
        let errors = err.error.split(';');
        errors.splice(errors.length - 1, 1);
        this.hipsterTranslate.translateErrorsReport(errors);        
        this.requestErrors = errors;
        console.log(this.requestErrors);
      }
    );    
  }

}
