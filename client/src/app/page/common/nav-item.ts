export class NavItem {
  id: string;
  title: string;
  current: boolean;
  router?: string;
  rightMenu: boolean;
  burgerMenu: boolean;
  hr: string;
  dev: string;
  logout?: boolean;
}

export class NavItemSet {
  type: string;
  style: string;
}
