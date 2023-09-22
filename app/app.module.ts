import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {NgProgressModule} from 'ngx-progressbar';
import {NgProgressHttpModule} from 'ngx-progressbar/http';
import {environment} from 'src/environments/environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';

import {AppRoutingModule} from './app.routing';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {AppSettings} from './app.settings';
import {AppInterceptor} from './theme/utils/app-interceptor';


import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LangComponent} from './theme/components/lang/lang.component';
import {HorizontalMenuComponent} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {VerticalMenuComponent} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {FooterComponent} from './theme/components/footer/footer.component';
import {Toolbar1Component} from "./theme/components/toolbar1/toolbar1.component";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, environment.url + '/assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    LangComponent,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    FooterComponent,
    Toolbar1Component
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgProgressModule,
    NgProgressHttpModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AppSettings,
    {provide: OverlayContainer, useClass: CustomOverlayContainer},
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'sr-Latn'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
