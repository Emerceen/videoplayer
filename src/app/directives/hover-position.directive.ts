import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { MousePosition } from './../entities/mouse-position';

@Directive({
  selector: '[asHoverPosition]'
})

export class HoverPositionDirective {
  private mousePosition: MousePosition;
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() set asHoverPosition(mousePosition: MousePosition) {
    this.mousePosition = mousePosition;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any): void {
    this.getCurrentMousePositionX(event.offsetX);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.getCurrentMousePositionX(0);
  }

  getCurrentMousePositionX(xPosition: number): void {
    this.mousePosition.x = this.calculatePercentageValue(xPosition);
  }

  calculatePercentageValue(xPosition: number): number {
    let elementWidth = this.el.clientWidth;
    let percentageValue = (xPosition / elementWidth) * 100;
    return percentageValue;
  }
}
