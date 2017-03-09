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
let shufflePlayLiteral = 'shufflePlay';
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

    it('and value and repeatPlaylist value are false then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });

    it('and value is true and repeatPlaylist value is false then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });

    it('and value and shufflePlaylist value are false then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

    it('and value is true and shufflePlaylist value is false then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

     it('and value and shufflePlaylist value are true then emit() method of repeatVideoClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

    it(`and value is true and repeatPlaylist, shufflePalylist values are true then emit() 
    method of repeatVideoClickEventHandler Output should call`, () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatVideoClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });
  });

  describe('when repeatPlaylist FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp.repeatPlaylistClickEventHandler, 'emit');
    });

    it('and value and repeatVideo value are falsy then emit() method of repeatPlaylistClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalled();
    });

    it('and value is falsy and repeatVideo value is true then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeTruthy();
    });

    it('and value and shufflePlay value are falsy then emit() method of repeatPlaylistClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalled();
    });

    it('and value is truthy and shufflePlay value is truthy then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalledWith(true);
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
    });

    it('and value and repeatVideo value are truthy then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      expect(comp.repeatPlaylistClickEventHandler.emit).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
    });
  });

  describe('when shufflePlay FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp.shufflePlayClickEventHandler, 'emit');
    });

    it('and value and other controls are falsy, then should emit false on shufflePlayClickEventHandler', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      expect(comp.shufflePlayClickEventHandler.emit).toHaveBeenCalledWith(false);
    });

    it('and value and repeatVideo are truthy, then should setValue of repeatVideo to falsy, and emit true', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
      expect(comp.shufflePlayClickEventHandler.emit).toHaveBeenCalledWith(true);
    });

    it('and value and repeatPlaylist are truthy, then should emit true', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      expect(comp.shufflePlayClickEventHandler.emit).toHaveBeenCalledWith(true);
    });
  });
});
