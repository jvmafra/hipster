import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HipsterTranslate {

  //@TO DO: In the future, this need to be saved on backend. This approach is just a workaround for now
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.translate.use(this.getCurrentLanguage());
  }

  public getCurrentLanguage() {
    let browserLanguage = navigator.language;
    //For languages like en-US, en-CA, etc.
    browserLanguage = browserLanguage.split('-')[0]

    if (localStorage.getItem('language') === 'undefined') {
      localStorage.setItem('language', browserLanguage);
    }

    return localStorage.getItem('language');
  }

  public getFormattedLanguage() {
    let lang = this.getCurrentLanguage();

    let hipster_languages = ["en", "pt"];        

    if (hipster_languages.indexOf(lang) === -1) {
      return "English";  
    }

    if (lang === "en") return "English"
    if (lang === "pt") return "Português"
  }

  public setLanguage(language) {
    localStorage.setItem('language', language);
    location.reload();
  }

  public translateErrorsPublication(errors) {
    let prefix = "ERRORS.RESPONSE.PUBLICATION.";

    for (var idx in errors) {
      errors[idx] = this.translate.instant(prefix + errors[idx]);
    }
  }

  public translateErrorsReport(errors) {
    let prefix = "ERRORS.RESPONSE.REPORT.";

    for (var idx in errors) {
      errors[idx] = this.translate.instant(prefix + errors[idx]);
    }
  }

  public translateItem(item){

    let itemTranslated = this.translate.instant(item);
    return itemTranslated;
  }

}
