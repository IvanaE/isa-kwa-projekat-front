import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from "@ngx-translate/core";

const paginatorRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 / ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} / ${length}`;
};

export function getPaginatorIntl(translateService: TranslateService) {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = translateService.instant('COMPONENTS.PAGINATOR.PER') + ': ';
  paginatorIntl.nextPageLabel = translateService.instant('COMPONENTS.PAGINATOR.NEXT');
  paginatorIntl.previousPageLabel = translateService.instant('COMPONENTS.PAGINATOR.PREV');
  paginatorIntl.firstPageLabel = translateService.instant('COMPONENTS.PAGINATOR.FIRST');
  paginatorIntl.lastPageLabel = translateService.instant('COMPONENTS.PAGINATOR.LAST');
  paginatorIntl.getRangeLabel = paginatorRangeLabel;

  return paginatorIntl;
}
