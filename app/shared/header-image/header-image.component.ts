import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'
import {AppSettings, Settings} from '../../app.settings';

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit {
  @Input('backgroundImage') backgroundImage;
  @Input('bgImageAnimate') bgImageAnimate;
  @Input('contentOffsetToTop') contentOffsetToTop;
  @Input('contentMinHeight') contentMinHeight;
  @Input('title') title;
  @Input('desc') desc;
  @Input('isHomePage') isHomePage: boolean = false;
  @Input('fullscreen') fullscreen: boolean = false;
  public bgImage;
  public settings: Settings;

  constructor(public appSettings: AppSettings, private sanitizer: DomSanitizer) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if (this.backgroundImage) {
      this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(' + this.backgroundImage + ')');
    }
  }


}
