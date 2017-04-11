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
import { EventStub } from './../mock/event-stub.spec';

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
let eventStub = new EventStub();

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
    eventStub.offsetX = 1000;
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

  describe('changeVideoTimeStamp() ', () => {
    beforeEach(() => {
      spyOn(comp, 'calculateClickedPlace');
    });
    it('should call calculateClickedPlace()', () => {
      comp.changeVideoTimeStamp(eventStub);
      expect(comp.calculateClickedPlace).toHaveBeenCalled();
    });
  });

  describe('calculateClickedPlace() ', () => {
    it('should return correct timeStamp', () => {
      expect(comp.calculateClickedPlace(1000, 100, 30)).toBe(300);
    });
  });

  describe('stopPropagation() ', () => {
    beforeEach(() => {
      spyOn(eventStub, 'stopPropagation');
    });
    it('should call event.stopPropagation', () => {
      comp.stopPropagation(eventStub);
      expect(eventStub.stopPropagation).toHaveBeenCalled();
    });
  });
});
