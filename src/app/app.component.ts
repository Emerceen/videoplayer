import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public translate: TranslateService) {

    let userLang = navigator.language.split('-')[0];
    userLang = 'pl';
    translate.use(userLang);
  }
}
