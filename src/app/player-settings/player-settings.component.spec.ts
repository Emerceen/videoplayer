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
let repeatVideoLiteral = 'repeatVideo';
let repeatPlaylistLiteral = 'repeatPlaylist';

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
    expect(comp.playerSettingsForm.controls[repeatVideoLiteral]).toBeDefined;
    expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral]).toBeDefined;
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
      spyOn(comp.repeatVideoClickEventHandler, 'emit');
    });

    it('then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
    });
  });

  describe('when repeatPlaylist FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp.repeatPlaylistClickEventHandler, 'emit');
    });

    it('then emit() method of repeatPlaylistClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalled();
    });
  });
});
