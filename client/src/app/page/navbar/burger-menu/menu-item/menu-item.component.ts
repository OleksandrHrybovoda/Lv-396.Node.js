import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../common/services/user.service';
import { NavItemsService } from '../../../common/nav-items.service';
import { NavItem, NavItemSet } from '../../../common/nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() public settings: NavItemSet;
  @Input() public link: NavItem;
  @Output() readonly clickOnMenuItem: EventEmitter<boolean> = new EventEmitter();

  checkedLink: boolean;
  userType: string;
  class: string;
  menuType: string;

  constructor(private readonly navService: NavItemsService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    this.setup();
    this.userType = this.userService.getUserType();
    this.checkedLink = this.navService.checkLink(this.link, this.userType, this.menuType);
  }

  setup(): void {
    this.class = this.settings.style;
    this.menuType = this.settings.type;
  }


  clickOnItem(): boolean {
    this.clickOnMenuItem.emit(true);

    return false;
  }
}
