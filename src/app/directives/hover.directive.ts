import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { HoverInterface } from '../entities/hover';

@Directive({
  selector: '[appHover]'
})

export class HoverDirective {
  private element: HoverInterface;
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() set appHover(element: HoverInterface) {
    this.element = element;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.toggleHover(true);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.toggleHover(false);
  }

  private toggleHover(value: boolean): void {
    this.element.isHover = value;
  }
}
