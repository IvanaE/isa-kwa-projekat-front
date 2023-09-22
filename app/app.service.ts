import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Forum} from './app.models';
import {AppSettings} from './app.settings';
import {environment} from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from './shared/confirm-dialog/confirm-dialog.component';
import {AlertDialogComponent} from './shared/alert-dialog/alert-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from "./service/login.service";

export class Data {
  constructor(public teme: Forum[],
              public pretplate: Forum[]) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data = null;

  public url = environment.url + '/api/';

  constructor(public http: HttpClient,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              public appSettings: AppSettings,
              public dialog: MatDialog,
              public translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object, public loginService: LoginService) {
    this.Data = localStorage.getItem('data') != null ? JSON.parse(localStorage.getItem('data')) : new Data(
      [], // teme
      []
    );
  }

  public subscribeTo(tema: Forum, direction) {
    if (!this.Data.pretplate.filter(item => item.id == tema.id)[0]) {
      this.Data.pretplate.push(tema);
      this.snackBar.open(this.translateService.instant('MESSAGE.ADDED_1') + ' "' + this.translateService.instant(tema.naziv) + '" ' + this.translateService.instant('MESSAGE.ADDED_2'), '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction
      });
    }
    localStorage.setItem('data', JSON.stringify(this.Data))
  }

  public openConfirmDialog(title: string, message: string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    return dialogRef;
  }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    });
    return dialogRef;
  }

  public filterData(data: any, params: any, sort?: any, page?: any, perPage?: any) {

    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort, data) {
    if (sort) {
      switch (sort) {
        case 'ENUMS.SORT.NEW':

          break;
        case 'ENUMS.SORT.OLD':

          break;
        case 'ENUMS.SORT.POP':
          data = data.sort((a, b) => a.teme.length - b.teme.length);
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) {
    var page = page || 1,
      perPage = perPage || 4,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPage),
      totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination: {
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }


}
