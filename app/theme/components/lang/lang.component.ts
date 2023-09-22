import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  public langName = '';

  constructor(public translateService: TranslateService) {
  }

  ngOnInit() {
    this.langName = this.getLangName(localStorage.getItem('lang') ? localStorage.getItem('lang') : this.translateService.getDefaultLang());
  }

  public changeLang(lang: string) {
    this.translateService.use(lang);
    this.langName = this.getLangName(lang);
    localStorage?.setItem('lang', lang);
  }

  public getLangName(lang: string) {
    if (lang == 'sr') {
      return 'Srpski';
    }
    if (lang == 'en') {
      return 'English';
    } else {
      return 'Srpski';
    }
  }

}
