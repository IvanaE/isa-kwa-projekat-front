import {isPlatformBrowser} from '@angular/common';
import {Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AppSettings, Settings} from '../app.settings';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public showBackToTop: boolean = false;
  public scrolledCount = 0;

  public settings: Settings;

  constructor(public appSettings: AppSettings, public router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {

  }


  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;

    let top_toolbar = document.getElementById('top-toolbar');
    if (top_toolbar) {
      if (scrollTop >= top_toolbar.clientHeight) {
        this.settings.mainToolbarFixed = true;
      } else {
        this.settings.mainToolbarFixed = false;
      }
    }


    let load_more = document.getElementById('load-more');
    if (load_more) {
      if (window.innerHeight > load_more.getBoundingClientRect().top + 120) {
        if (!this.settings.loadMore.complete) {
          if (this.settings.loadMore.start) {
            if (this.scrolledCount < this.settings.loadMore.step) {
              this.scrolledCount++;
              if (!this.settings.loadMore.load) {
                this.settings.loadMore.load = true;
              }
            } else {
              this.settings.loadMore.start = false;
              this.scrolledCount = 0;
            }
          }
        }
      }
    }
  }


  ngAfterViewInit() {
    document.getElementById('preloader')?.classList.add('hide');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
        this.settings.mainToolbarFixed = false;
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
          }
        });
      }
    });
  }


}
