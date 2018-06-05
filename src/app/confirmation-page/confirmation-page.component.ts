import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from "../services/confirmation.service";
import {ActivatedRoute} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { HipsterTranslate } from "../services/hipster-translate.service";
import {AlertService} from "../services/alert.service";

const CONFIRMATION_TRANSLATE = "CONFIRMATION.";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})

export class ConfirmationPageComponent implements OnInit {
  private classIcon : any;
  private message: String;

  constructor(private confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private alertService: AlertService) {

        this.classIcon = true;
  }

  ngOnInit() {
    this.alertService.showLoadIndication();

    this.route.params.subscribe(params => {
      let token = params['token'];

      this.confirmationService.getConfirmation(token).subscribe(data => {
          this.classIcon = true;
        },
          err => {
            this.classIcon = false;

            if (err.error === "CONFIRMATION_ERROR_EMAIL") {
              this.message = this.hipsterTranslate.translateItem(CONFIRMATION_TRANSLATE + err.error);
            } else {
              this.message = this.hipsterTranslate.translateItem(CONFIRMATION_TRANSLATE + "CONFIRMATION_ERROR");
            }
      });
    });
  }

  getClass() {
    return this.classIcon;
  }

}
