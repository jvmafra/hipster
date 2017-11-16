import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HipsterTranslate {

  //@TO DO: In the future, this need to be saved on backend. This approach is just a workaround for now
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.translate.use(this.getCurrentLanguage());
  }

  public getCurrentLanguage() {
    var browserLanguage = navigator.language;
    //For languages like en-US, en-CA, etc.
    browserLanguage = browserLanguage.split('-')[0]

    if (localStorage.getItem('language') === 'undefined') {
      localStorage.setItem('language', browserLanguage);
    }

    return localStorage.getItem('language');
  }


  public setLanguage(language) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

}
