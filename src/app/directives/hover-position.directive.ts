import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { MousePosition } from './../entities/mouse-position';

@Directive({
  selector: '[appHoverPosition]'
})

export class HoverPositionDirective {
  private mousePosition: MousePosition;
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() set appHoverPosition(mousePosition: MousePosition) {
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
    const elementWidth = this.el.clientWidth;
    const percentageValue = (xPosition / elementWidth) * 100;
    return percentageValue;
  }
}
