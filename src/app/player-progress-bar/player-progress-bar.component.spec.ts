import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { Component, ElementRef } from '@angular/core';

import { VideoControls } from './../entities/video-controls';

import { DocumentMozMsPrefixesRefService } from '../services/document.service';
import { BufferingStateService } from './../services/buffering-state.service';

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
        { provide: DocumentMozMsPrefixesRefService, useClass: DocumentMock },
        BufferingStateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProgressBarComponent);
    comp = fixture.componentInstance;
    documentMock = fixture.debugElement.injector.get(DocumentMozMsPrefixesRefService);
    comp.videoElement = <ElementRef> element;
    comp.videoControls = new VideoControls();
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

  describe('checkBufferedLength', () => {
    beforeEach(() => {
      spyOn(comp, 'bufferVideo');
      spyOn(comp, 'stopBufferVideo');
    });
    it('should call bufferVideo() when bufferEnd is bigger 0.2 than currentTime', () => {
      comp.videoControls.stopped = false;
      comp.checkBufferedLength(10, 5, 5.2);
      expect(comp.bufferVideo).toHaveBeenCalled();
    });

    it('should call stopBufferVideo() when bufferEnd is bigger 4 than currentTime and bufferingVideo is true', () => {
      comp.bufferingVideo = true;
      comp.checkBufferedLength(10, 5, 9);
      expect(comp.stopBufferVideo).toHaveBeenCalled();
    });

    it('should call stopBufferVideo() when bufferEnd is equal to duration and bufferingVideo is false', () => {
      comp.bufferingVideo = true;
      comp.checkBufferedLength(10, 5, 10);
      expect(comp.stopBufferVideo).toHaveBeenCalled();
    });
  });

  describe('bufferVideo() should set bufferingVideo to true and when', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'pause');
    });

    it('videoElement.nativeElement.played is true should call nativeElemenet.pause()', () => {
      element.nativeElement.played = true;
      comp.videoElement = <ElementRef> element;
      comp.bufferVideo();
      expect(comp.bufferingVideo).toBeTruthy();
      expect(comp.videoElement.nativeElement.pause).toHaveBeenCalled();
    });

    it('videoElement.nativeElement.played is false should not call nativeElemenet.pause()', () => {
      element.nativeElement.played = false;
      comp.videoElement = <ElementRef> element;
      comp.bufferVideo();
      expect(comp.bufferingVideo).toBeTruthy();
      expect(comp.videoElement.nativeElement.pause).toHaveBeenCalledTimes(0);
    });
  });

   describe('stopBufferVideo() should set bufferingVideo to false and when', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'play');
    });

    it('videoControls.played is true should call nativeElemenet.play()', () => {
      comp.videoControls.played = true;
      comp.stopBufferVideo();
      expect(comp.bufferingVideo).toBeFalsy();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
    });

    it('videoElement.nativeElement.played is false should not call nativeElemenet.play()', () => {
      comp.videoControls.played = false;
      comp.stopBufferVideo();
      expect(comp.bufferingVideo).toBeFalsy();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalledTimes(0);
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
