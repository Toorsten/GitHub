import { TranslateService } from './translate/translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public translatedText: string;
  public supportedLanguages: any[];

  constructor(private translateService: TranslateService) {

  }

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'EN', value: 'en' },
      { display: 'DE', value: 'de' },
      { display: 'FR', value: 'fr'},
      { display: 'IT', value: 'it'},
      { display: 'ES', value: 'es'},
    ];

    this.selectLang(navigator.language);
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this.translateService.currentLang;
  }

  selectLang(lang: string) {
    // set current lang;
    this.translateService.use(lang);
    this.refreshText();
  }

  refreshText() {
    // refresh translation when language change
    this.translatedText = this.translateService.instant('activation');
  }

}

