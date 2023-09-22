import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AppSettings, Settings} from '../../app.settings';
import {AppService} from '../../app.service';
import {Pagination, Tema} from '../../app.models';
import {isPlatformBrowser} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TopicService} from "../../service/topic.service";
import {ForumService} from "../../service/forum.service";


@Component({
  selector: 'app-teme',
  templateUrl: './teme.component.html',
  styleUrls: ['./teme.component.scss']
})
export class TemeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public teme: Tema[];
  public count: number = 6;
  public sort: string;
  public searchFields: any;
  public pagination: Pagination = new Pagination(1, this.count, null, 2, 0, 0);
  public message: string | null;
  public watcher: Subscription;

  public settings: Settings
  public desc: string;

  constructor(public appSettings: AppSettings,
              public appService: AppService,
              public mediaObserver: MediaObserver,
              public translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private topicService: TopicService, public forumService: ForumService) {
    this.settings = this.appSettings.settings;
    this.watcher = mediaObserver.asObservable()
      .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.sidenavOpen = false;
        } else if (change.mqAlias == 'sm') {
          this.sidenavOpen = false;
        } else if (change.mqAlias == 'md') {
          this.sidenavOpen = true;
        } else {
          this.sidenavOpen = true;
        }
      });

  }

  ngOnInit() {
    this.desc = 'STRANICE.TEME.DESC';
    this.getTeme();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public getTeme() {
    this.topicService.getAll().subscribe(data => {
      let id: string = null;
      this.route.paramMap.subscribe((params: ParamMap) => {
        id = params.get('id');
      });

      if (id != null) {
        this.forumService.getOne(Number.parseInt(id)).subscribe(o => this.desc = o.naziv);
      }

      let result = this.filterData(data.filter(f => f.forum.id.toString() == id || id == null));
      if (data.length == 0) {
        this.teme.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = this.translateService.instant('COMPONENTS.PRETPLATE.COL.ERRORL.EMPTY');
      } else {
        this.teme = result.data;
        this.pagination = result.pagination;
        this.message = null;
      }

    })
  }

  public resetPagination() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data) {
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  }


  public changeCount(count) {
    this.count = count;
    this.teme.length = 0;
    this.resetPagination();
    this.getTeme();
  }

  public changeSorting(sort) {
    this.sort = sort;
    this.teme.length = 0;
    this.getTeme();
  }


  public onPageChange(e) {
    this.pagination.page = e.pageIndex + 1;
    this.getTeme();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

}
