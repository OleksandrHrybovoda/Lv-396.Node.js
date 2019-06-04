import { Injectable } from '@angular/core';
import { NavItem } from './nav-item';
import { NAVBAR_LIST } from './mock-nav-items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavItemsService {
  getNavList(): Observable<NavItem[]> {
    return of(NAVBAR_LIST);
  }
  currentRouter(currentRouter: string): Observable<NavItem[]> {
    NAVBAR_LIST.map(item => item.current = item.router.split('/')[2] === currentRouter.split('/')[2]);

    return of(NAVBAR_LIST);
  }
  checkLink(link: NavItem, userType: string, menu: string): boolean {
    const type = userType === 'hr' ? link.hr : link.dev;
    const side = menu === 'burgerMenu' ? link.burgerMenu : link.rightMenu;

    return (side && userType === type);
  }
}
