import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HoverDirective } from './hover.directive';

@Component({
  template: `
  <div class="hover-div" [appHover]="controls">hover test</div>`
})

class TestComponent {
  public controls: any = {
    isHover: false
  };
}

describe('HoverDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let hoverElements: DebugElement[];
  let comp: TestComponent;
  let hoverElement: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HoverDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
    hoverElements = fixture.debugElement.queryAll(By.directive(HoverDirective));
    hoverElement = fixture.nativeElement.querySelector('.hover-div');
  });

  it('should have one hover element', () => {
    expect(hoverElements.length).toBe(1);
  });

  describe('toggle Hover should change state of .isHover', () => {
    it('when mouse is enter on div', () => {
      comp.controls.isHover = false;
      const event = new Event('mouseenter');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(comp.controls.isHover).toBeTruthy();
    });

    it('when mouse is leave of div', () => {
      comp.controls.isHover = true;
      const event = new Event('mouseleave');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(comp.controls.isHover).toBeFalsy();
    });
  });
});
