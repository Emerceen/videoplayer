import { Component } from '@angular/core';

import { TranslateService } from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'as-main-app',
  templateUrl: 'app.html'
})
export class AppComponent {
  constructor(public translate: TranslateService) {

    let userLang = navigator.language.split('-')[0];
    userLang = 'pl';
    translate.use(userLang);
  }
}
