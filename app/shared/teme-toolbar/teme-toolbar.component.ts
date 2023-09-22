import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-teme-toolbar',
  templateUrl: './teme-toolbar.component.html',
  styleUrls: ['./teme-toolbar.component.scss']
})
export class TemeToolbarComponent implements OnInit {
  @Input() isHomePage: boolean = false;
  @Input() showSidenavToggle: boolean = false;
  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeSorting: EventEmitter<any> = new EventEmitter<any>();

  public counts = [3, 6, 8, 16, 24, 36];
  public count: any;
  public sortings = ['ENUMS.SORT.DEF', 'ENUMS.SORT.NEW', 'ENUMS.SORT.OLD', 'ENUMS.SORT.POP'];
  public sort: any;

  constructor() {
  }

  ngOnInit() {
    this.count = (this.isHomePage) ? this.counts[0] : this.counts[1];
    this.sort = this.sortings[0];
  }

  public changeCount(count) {
    this.count = count;
    this.onChangeCount.emit(count);
  }

  public changeSorting(sort) {
    this.sort = sort;
    this.onChangeSorting.emit(sort);
  }

  public sidenavToggle() {
    this.onSidenavToggle.emit();
  }

}
