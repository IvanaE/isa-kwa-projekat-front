import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppSettings, Settings} from './app.settings';
import {NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public settings: Settings;

  constructor(public appSettings: AppSettings,
              public router: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              public translate: TranslateService) {
    this.settings = this.appSettings.settings;
    translate.addLangs(['sr', 'en']);
    translate.setDefaultLang('sr');
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'sr');
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
          }
        });
      }
    });
  }

}
