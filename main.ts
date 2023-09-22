import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {registerLocaleData} from '@angular/common';
import locale from '@angular/common/locales/sr-Latn'
import {AppModule} from './app/app.module';

registerLocaleData(locale, 'sr')
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
