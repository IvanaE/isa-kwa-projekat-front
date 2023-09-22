import {Component, Input, OnInit} from '@angular/core';
import {Forum} from '../../app.models';
import {AppSettings, Settings} from '../../app.settings';

import {AppService} from '../../app.service';

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.scss']
})
export class ForumItemComponent implements OnInit {
  @Input() tema: Forum;
  @Input() viewType: string = "list";
  public settings: Settings;

  constructor(public appSettings: AppSettings, public appService: AppService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
  }


  public subscribeTo() {
    //TODO fix addtofav
    // this.appService.subscribeTo(this.tema, (this.settings.rtl) ? 'rtl' : 'ltr');
  }

  public isSubscribed() {
    return this.appService.Data.pretplate.filter(item => item.id == this.tema.id)[0];
  }


}
