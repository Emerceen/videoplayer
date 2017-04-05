import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HoverDirective } from './hover.directive';

@Component({
  template: `
  <div class="hover-div" [asHover]="controls">hover test</div>`
})

class TestComponent {
  public controls: any = {
    isHover: false
  };
}

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let comp: TestComponent;
  let hoverElement: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HoverDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(HoverDirective));
    hoverElement = fixture.nativeElement.querySelector('.hover-div');
  });

  it('should have one hover element', () => {
    expect(des.length).toBe(1);
  });

  describe('toggle Hover should change state of .isHover', () => {
    it('when mouse is enter on div', () => {
      comp.controls.isHover = false;
      let event = new Event('mouseenter');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(comp.controls.isHover).toBeTruthy();
    });

    it('when mouse is leave of div', () => {
      comp.controls.isHover = true;
      let event = new Event('mouseleave');
      fixture.detectChanges();
      hoverElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(comp.controls.isHover).toBeFalsy();
    });
  });
});
