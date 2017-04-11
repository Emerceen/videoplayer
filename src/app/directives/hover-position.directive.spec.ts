import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HoverPositionDirective } from './hover-position.directive';
import { MousePosition } from './../entities/mouse-position';

@Component({
  template: `
  <div class="hover-div" [asHoverPosition]="mousePosition">hover test</div>`
})

class TestComponent {
  public mousePosition: MousePosition = {
    x: 0
  };
}

describe('HoverPositionDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let elements: DebugElement[];
  let comp: TestComponent;
  let hoverElement: any;
  let mouseMoveEvent = document.createEvent('MouseEvents');

  mouseMoveEvent.initMouseEvent(
    'mousemove',
    true, // canBubble
    false, // cancelable
    window, // event's AbstractView : should be window
    1, // detail : Event's mouse click count
    50, // screenX
    50, // screenY
    50, // clientX
    50, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button : 0 = click, 1 = middle button, 2 = right button
    null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
  );

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HoverPositionDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
    elements = fixture.debugElement.queryAll(By.directive(HoverPositionDirective));
    hoverElement = fixture.nativeElement.querySelector('.hover-div');
  });

  it('should have one hover element', () => {
    expect(elements.length).toBe(1);
  });

  describe('toggle Hover should change value of mousePosition.x', () => {
    it('when mouse is enter on div', () => {
      let event: any = new Event('mousemove');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
    });

    it('when mouse is leave of div', () => {
      let event = new Event('mouseleave');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(comp.mousePosition.x).toBe(0);
    });
  });
});
