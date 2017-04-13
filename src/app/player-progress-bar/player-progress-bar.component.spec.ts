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
      spyOn(comp, 'registerProgress');
      comp.videoElement = undefined;
    });

    it('should set videoElement, and call registerTimeUpdate() and registerProgress()', () => {
      comp.videoElement = <ElementRef> element;
      expect(comp.videoElement).toBe(<ElementRef> element);
      expect(comp.registerTimeUpdate).toHaveBeenCalled();
      expect(comp.registerProgress).toHaveBeenCalled();
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

  describe('registerProgress() ', () => {
    beforeEach(() => {
      spyOn(comp, 'getPercentageBufferedVideo');
    });
    describe('should set videoElement.nativeElement.onprogress', () => {
      it('when videoElement.nativeElement.buffered.length is greather than 0', () => {
        element.nativeElement.buffered.length = 0.1;
        comp.registerProgress();
        comp.videoElement.nativeElement.onprogress(null);
        expect(comp.getPercentageBufferedVideo).toHaveBeenCalled();
      });
    });

    describe('should do nothing', () => {
      it('when videoElement.nativeElement.buffered.length is 0', () => {
        element.nativeElement.buffered.length = 0;
        comp.registerProgress();
        comp.videoElement.nativeElement.onprogress(null);
        expect(comp.getPercentageBufferedVideo).toHaveBeenCalledTimes(0);
      });

      it('when videoElement.nativeElement.buffered.length is less than 0', () => {
        element.nativeElement.buffered.length = -1;
        comp.registerProgress();
        comp.videoElement.nativeElement.onprogress(null);
        expect(comp.getPercentageBufferedVideo).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('getPercentageCurrentTime() ', () => {
    beforeEach(() => {
      comp.percentageCurrentTime = 0;
    });
    it('should set percentageCurrentTime', () => {
      comp.getPercentageCurrentTime(100, 10);
      expect(comp.percentageCurrentTime).toBe(10);
    });

    it('should do nothing, when duration is 0', () => {
      expect(comp.getPercentageCurrentTime(0, 1)).toBeUndefined();
      expect(comp.percentageCurrentTime).toBe(0);
    });

    it('should do nothing, when duration less than 0', () => {
      expect(comp.getPercentageCurrentTime(-1, 1)).toBeUndefined();
      expect(comp.percentageCurrentTime).toBe(0);
    });
  });

  describe('getPercentageBufferedVideo() ', () => {
    beforeEach(() => {
      comp.percentageBufferedVideo = 0;
    });

    it('should set getPercentageBufferedVideo()', () => {
      comp.getPercentageBufferedVideo(100, 10);
      expect(comp.percentageBufferedVideo).toBe(10);
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
