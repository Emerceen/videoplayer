import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlayerSettingsComponent, PlayerSettingsModule } from './index';


@Component({
  selector: 'as-test',
  template: '<as-player-settings></as-player-settings>'
})


class TestComponent {
}

let comp: PlayerSettingsComponent;
let fixture: ComponentFixture<PlayerSettingsComponent>;
let de: DebugElement;
let repeatVideoStringLiteral = 'repeatVideo';

describe('PlayerSettingsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerSettingsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSettingsComponent);
    comp = fixture.componentInstance;
    comp.playerSettings = false;
  });

  it('constructor() should create FormGroup', () => {
    expect(comp.playerSettingsForm instanceof FormGroup).toBeTruthy();
    expect(comp.playerSettingsForm.controls[repeatVideoStringLiteral]).toBe(comp.repeatVideo);
  });

  describe('when playerSettings input is', () => {
    beforeEach(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.player-settings'));
    });

    afterEach(() => {
      comp.playerSettings = false;
    });

    it('false, should not show options menu', () => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.player-settings'));
      expect(de).toBeNull();
    });

    it('truthy, should show options menu', () => {
      comp.playerSettings = true;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.player-settings'));
      expect(de.nativeElement.textContent).toBeDefined();
    });
  });

  describe('when repeatVideo FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp.repeatClickEventHandler, 'emit');
    });

    it('then emit() method of repeatClickEventHandler Output should call', () => {
      comp.repeatVideo.setValue(true);
      expect(comp.repeatClickEventHandler.emit).toHaveBeenCalled();
    });
  });
});
