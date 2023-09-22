import {Component, Input, OnInit} from '@angular/core';
import {Tema} from '../../app.models';
import {AppSettings, Settings} from '../../app.settings';

import {AppService} from '../../app.service';

@Component({
  selector: 'app-tema-item',
  templateUrl: './tema-item.component.html',
  styleUrls: ['./tema-item.component.scss']
})
export class TemaItemComponent implements OnInit {
  @Input() tema: Tema;
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
