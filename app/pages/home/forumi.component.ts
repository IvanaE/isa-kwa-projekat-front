import {Component, OnInit} from '@angular/core';
import {AppSettings, Settings} from '../../app.settings';
import {AppService} from '../../app.service';
import {Forum, Pagination} from '../../app.models';
import {MediaObserver} from '@angular/flex-layout';
import {TranslateService} from "@ngx-translate/core";
import {ForumService} from "../../service/forum.service";

@Component({
  selector: 'app-home',
  templateUrl: './forumi.component.html',
  styleUrls: ['./forumi.component.scss']
})
export class ForumiComponent implements OnInit {

  public forumi: Forum[];
  public viewType: string = 'grid';
  public viewCol: number = 33.3;
  public count: number = 3;
  public sort: string;
  public searchFields: any;
  public pagination: Pagination = new Pagination(1, 3, null, 2, 0, 0);
  public message: string | null;

  public settings: Settings;

  constructor(public appSettings: AppSettings, public appService: AppService, public mediaObserver: MediaObserver, public translateService: TranslateService, public forumService: ForumService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getTeme();
  }

  ngDoCheck() {
    if (this.settings.loadMore.load) {
      this.settings.loadMore.load = false;
      this.getTeme();
    }
  }

  ngOnDestroy() {
    this.resetLoadMore();
  }

  public getTeme() {
    this.forumService.getAll().subscribe(data => {
      if (this.forumi && this.forumi.length > 0) {
        this.settings.loadMore.page++;
        this.pagination.page = this.settings.loadMore.page;
      }
      let result = this.filterData(data);
      if (result.data.length == 0) {
        this.forumi.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = this.translateService.instant('COMPONENTS.PRETPLATE.COL.ERRORL.EMPTY');
        return false;
      }
      if (this.forumi && this.forumi.length > 0) {
        this.forumi = this.forumi.concat(result.data);
      } else {
        this.forumi = result.data;
      }
      this.pagination = result.pagination;
      this.message = null;

      if (this.forumi.length == this.pagination.total) {
        this.settings.loadMore.complete = true;
        this.settings.loadMore.result = this.forumi.length;
      } else {
        this.settings.loadMore.complete = false;
      }

      return true;
    })
  }

  public resetLoadMore() {
    this.settings.loadMore.complete = false;
    this.settings.loadMore.start = false;
    this.settings.loadMore.page = 1;
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data) {
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  }

  public changeCount(count) {
    this.count = count;
    this.resetLoadMore();
    this.forumi.length = 0;
    this.getTeme();

  }

  public changeSorting(sort) {
    this.sort = sort;
    this.resetLoadMore();
    this.forumi.length = 0;
    this.getTeme();
  }


}
