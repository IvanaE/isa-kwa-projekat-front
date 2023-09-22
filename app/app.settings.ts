import {Injectable} from '@angular/core';

export class Settings {
  constructor(public name: string,
              public theme: string,
              public mainToolbarFixed: boolean,
              public loadMore: {
                start: boolean,
                step: number,
                load: boolean,
                page: number,
                complete: boolean,
                result: number
              }
  ) {

  }
}

@Injectable()
export class AppSettings {
  public settings: Settings = localStorage.getItem('settings') != null ? JSON.parse(localStorage.getItem('settings')) :
    new Settings('Forum',
      'pink',
      false,
      {
        start: false,
        step: 1,
        load: false,
        page: 1,
        complete: false,
        result: 0
      })

  constructor() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }
}
