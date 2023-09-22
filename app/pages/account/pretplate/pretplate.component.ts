import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {Forum} from 'src/app/app.models';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {getPaginatorIntl} from "../../../theme/utils/app-paginator";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-pretplate',
  templateUrl: './pretplate.component.html',
  styleUrls: ['./pretplate.component.scss'],
  providers: [{provide: MatPaginatorIntl, useFactory: getPaginatorIntl, deps: [TranslateService]}],
})
export class PretplateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'title', 'actions'];
  dataSource: MatTableDataSource<Forum>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private translateService: TranslateService;

  constructor(public appService: AppService, translateService: TranslateService) {
    this.translateService = translateService;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.appService.Data.pretplate);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (tema, filter) => this.translateService.instant(tema.naziv)
      .toLocaleLowerCase().includes(filter.toLocaleLowerCase());

  }

  public remove(tema: Forum) {
    const index: number = this.dataSource.data.indexOf(tema);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Forum>(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    localStorage.setItem('data', JSON.stringify(this.appService.Data))
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
