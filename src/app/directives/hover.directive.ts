import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { HoverInterface } from '../entities/hover';

@Directive({
  selector: '[asHover]'
})

export class HoverDirective {
  private element: HoverInterface;
  private el: ElementRef;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() set asHover(element: HoverInterface) {
    this.element = element;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.toggleHover(true);
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.toggleHover(false);
  }

  private toggleHover(value: boolean): void {
    if (this.element) {
      this.element.isHover = value;
    }
  }
}
