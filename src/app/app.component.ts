import { Component } from '@angular/core';
import { HipsterTranslate } from './services/hipster-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private hipsterTranslate: HipsterTranslate) {}

  public changeLanguage(language) {
    this.hipsterTranslate.setLanguage(language);
  }
}
