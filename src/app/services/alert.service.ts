import { Injectable } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Injectable()
export class AlertService {
  private $ : any;

  constructor() {}

  public showErrorAlert(textHead: string, text: string) {
    $.uiAlert({
      textHead: textHead, // header
      text: text, // Text
      bgcolor: '#cc0000', // background-color
      textcolor: '#fff', // color
      position: 'top-right',// position . top And bottom ||  left / center / right
      time: 3, // time
    })
  }

  public showSuccessAlert(textHead: string, text: string) {
    $.uiAlert({
      textHead: textHead, // header
      text: text, // Text
      bgcolor: '#19c3aa', // background-color
      textcolor: '#fff', // color
      position: 'top-right',// position . top And bottom ||  left / center / right
      time: 3, // time
    })
  }

}
