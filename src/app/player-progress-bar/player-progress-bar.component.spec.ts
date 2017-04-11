import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { Component, ElementRef } from '@angular/core';

import { DocumentMozMsPrefixesRefService } from '../services/document.service';

import { PlayerProgressBarComponent, PlayerProgressBarModule } from './index';

import { DocumentMock } from './../mock/document-mock.spec';
import { ElementStub } from './../mock/element-stub.spec';

@Component({
  selector: 'as-test',
  template: '<as-player-progress-bar></as-player-progress-bar>'
})

class TestComponent {
}

let comp: PlayerProgressBarComponent;
let fixture: ComponentFixture<PlayerProgressBarComponent>;
let element = new ElementStub();
let documentMock: DocumentMozMsPrefixesRefService;

describe('PlayerProgressBarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerProgressBarModule],
      providers: [
        { provide: DocumentMozMsPrefixesRefService, useClass: DocumentMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProgressBarComponent);
    comp = fixture.componentInstance;
    documentMock = fixture.debugElement.injector.get(DocumentMozMsPrefixesRefService);
    comp.videoElement = <ElementRef> element;
  });

  describe('videoElement setter', () => {
    beforeEach(() => {
      spyOn(comp, 'registerTimeUpdate');
      comp.videoElement = undefined;
    });

    it('should set videoElement, and call registerTimeUpdate()', () => {
      comp.videoElement = <ElementRef> element;
      expect(comp.videoElement).toBe(<ElementRef> element);
      expect(comp.registerTimeUpdate).toHaveBeenCalled();
    });
  });

  describe('registerTimeUpdate() ', () => {
    beforeEach(() => {
      spyOn(comp, 'getPercentageCurrentTime');
    });
    it('should set videoElement.nativeElement.ontimeupdate', () => {
      comp.registerTimeUpdate();
      comp.videoElement.nativeElement.ontimeupdate(null);
      expect(comp.getPercentageCurrentTime).toHaveBeenCalled();
    });
  });

  describe('getPercentageCurrentTime() ', () => {
    it('should set percentageCurrentTime', () => {
      comp.getPercentageCurrentTime(100, 10);
      expect(comp.percentageCurrentTime).toBe(10);
    });
  });
});
