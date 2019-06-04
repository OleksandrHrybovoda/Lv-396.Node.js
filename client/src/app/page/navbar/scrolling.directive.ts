import { Directive, HostListener, HostBinding, OnInit } from '@angular/core';
@Directive({
  selector: '[appScrolling]'
})

export class ScrollingDirective implements OnInit {
  coordinatesY: number;

  @HostBinding('class.show') show: boolean;
  @HostBinding('class.hide') hide: boolean;

  @HostListener('window: scroll', ['$event']) onScrolling(event): void {

    this.show = this.coordinatesY > event.path[1].scrollY
      && this.coordinatesY !== 0;
    this.hide = this.coordinatesY < event.path[1].scrollY
      && event.path[1].scrollY > 40;

    this.coordinatesY = event.path[1].scrollY;
  }

  ngOnInit(): void {
    this.coordinatesY = 0;
  }
}
