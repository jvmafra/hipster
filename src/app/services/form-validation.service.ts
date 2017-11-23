import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormValidationService {
  private data: any;

  constructor(private translate: TranslateService) {
    this.data = {}
  }

  public getFormValidationVariables(errorInfo) {
    this.data = {}
    this.data["inline"] = true;
    this.data["fields"] = {}

    for(var idx in errorInfo) {
      let input = errorInfo[idx].input;
      let currentErrorInfo = errorInfo[idx];

      this.data.fields[input] = {};
      let rules = this.initError(input, currentErrorInfo);
      this.data.fields[errorInfo[idx].input].rules = rules;
    }

    this.data["onSuccess"] = function(event, fields) {
      event.preventDefault();
    }

    return this.data;
  }

  private initError(input, currentErrorInfo) {
    let rules = []

    for (var index in currentErrorInfo.errors) {
      let errorType = currentErrorInfo.errors[index]
      let errorPrompt = currentErrorInfo.prompt[index]

      rules.push({type: errorType, prompt: this.translate.instant(errorPrompt)});
    }

    return rules;
  }

}
