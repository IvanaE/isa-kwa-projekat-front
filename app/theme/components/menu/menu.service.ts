import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from './menu.model';
import {horizontalMenuItems, verticalMenuItems} from './menu';

@Injectable()
export class MenuService {

  constructor(private router: Router) {
  }

  public getVerticalMenuItems(): Array<Menu> {
    return verticalMenuItems;
  }

  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems;
  }


  public toggleMenuItem(menuId) {
    let menuItem = document.getElementById('menu-item-' + menuId);
    let subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem!.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem!.classList.add('expanded');
      }
    }
  }


}
