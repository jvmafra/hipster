import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ConfirmationService} from "../services/confirmation.service";
import {ActivatedRoute} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationPageComponent implements OnInit {
  private  classIcon : any;

  constructor(private confirmatioService: ConfirmationService,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.showLoadIndication();

    this.route.params.subscribe(params => {
      let token = params['token'];

      this.confirmatioService.getConfirmation(token).subscribe(data => {
          this.classIcon = true;
        },
          err => {
            this.classIcon = false;
      });
    });
  }

  getClass() {
    return this.classIcon;
  }

}
