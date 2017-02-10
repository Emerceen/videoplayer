import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Communication } from '../services/communication';
import { MockCommunication } from '../services/mock-communication';
import { PlayerComponent, PlayerModule } from './index';

class SanitizerStub {
  public bypassSecurityTrustUrl(url: string): string {
    return url;
  }
}

class EventStub {
  public preventDefault(): void {
    return;
  }
}

class ElementStub {
  nativeElement: Object = {
    poster: undefined,
    load(): void {
      return;
    },
    play(): void {
      return;
    },
    pause(): void {
      return;
    }
  };
}

@Component({
  selector: 'as-test',
  template: '<as-player></as-player>'
})


class TestComponent {
}

let comp: PlayerComponent;
let fixture: ComponentFixture<PlayerComponent>;
let communication: MockCommunication;
let sanitizer: DomSanitizer;
let event = new EventStub();
let element = new ElementStub();

describe('PlayerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerModule],
      providers: [
        { provide: Communication, useClass: MockCommunication },
        { provide: DomSanitizer, useClass: SanitizerStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
    sanitizer = fixture.debugElement.injector.get(DomSanitizer);
    comp.videoElement = element;
  });

  it('ngOnInit should call getVideoUrls', () => {
    spyOn(comp, 'getVideoUrls');
    comp.ngOnInit();
    expect(comp.getVideoUrls).toHaveBeenCalled();
  });

  describe('getVideoUrls should', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
    });

    afterEach(() => {
      comp.videos = undefined;
      communication.videoService.videoUrlsError = false;
    });

    it('get videos and call setCurrentVideo when response is success', () => {
      comp.getVideoUrls();
      expect(comp.videos).toBe(communication.videoService.videoUrlsMock.videos);
      expect(comp.setCurrentVideo).toHaveBeenCalled();
    });

    it('return false when response is error', () => {
      communication.videoService.videoUrlsError = true;
      expect(comp.getVideoUrls()).toBeFalsy();
    });
  });

  describe('setCurrentVideo should', () => {
    describe('set safeUrl of video object, and define currentVideo of video object', () => {
      beforeEach(() => {
        comp.videos = communication.videoService.videoUrlsMock.videos;
      });

      afterEach(() => {
        comp.videos.map(video => { video.safeUrl = undefined; });
      });

      afterAll(() => {
        comp.currentVideo = undefined;
        comp.videos = undefined;
      });

      it('when index parameter is not given', () => {
        comp.setCurrentVideo();
        expect(comp.videos[0].safeUrl).toBe(communication.videoService.videoUrlsMock.videos[0].url);
        expect(comp.videos[1].safeUrl).toBeUndefined();
        expect(comp.videos[2].safeUrl).toBeUndefined();
        expect(comp.videos[3].safeUrl).toBeUndefined();
        expect(comp.currentVideo).toBe(comp.videos[0]);
      });

      it('when index parameter is 3', () => {
        comp.setCurrentVideo(3);
        expect(comp.videos[3].safeUrl).toBe(communication.videoService.videoUrlsMock.videos[3].url);
        expect(comp.videos[1].safeUrl).toBeUndefined();
        expect(comp.videos[2].safeUrl).toBeUndefined();
        expect(comp.videos[0].safeUrl).toBeUndefined();
        expect(comp.currentVideo).toBe(comp.videos[3]);
      });
    });
  });

  describe('endedEventHandler should ', () => {
    describe('call event.preventDefault and call', () => {
      beforeEach(() => {
        spyOn(comp, 'setCurrentVideo');
        spyOn(comp, 'stopVideo');
        spyOn(event, 'preventDefault');
        spyOn(comp.videoElement.nativeElement, 'load');
        spyOn(comp.videoElement.nativeElement, 'play');
        comp.videos = communication.videoService.videoUrlsMock.videos;
      });

      afterAll(() => {
        comp.currentVideo = undefined;
        comp.videos = undefined;
      });

      it('setCurrentVideo, load, play when index currentVideo of videos is 0', () => {
        comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
        comp.endedEventHandler(<Event> event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(comp.setCurrentVideo).toHaveBeenCalledWith(1);
        expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
        expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
      });

      it('load, stopVideo when index currentVideo of videos is 3', () => {
        comp.currentVideo = communication.videoService.videoUrlsMock.videos[3];
        comp.endedEventHandler(<Event> event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
        expect(comp.stopVideo).toHaveBeenCalled();
      });
    });
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'load');
      spyOn(comp.videoElement.nativeElement, 'play');
      spyOn(comp.videoElement.nativeElement, 'pause');
      spyOn(comp, 'setCurrentVideo');
    });

    afterEach(() => {
      comp.videoElement.nativeElement.poster = undefined;
      comp.isStopped = true;
      comp.isPlaying = false;
    });

    it('playVideo', () => {
      comp.videoElement.nativeElement.poster = 'example';
      comp.playVideo();
      expect(comp.isStopped).toBeFalsy();
      expect(comp.isPlaying).toBeTruthy();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.poster).toBeUndefined();
    });

    it('pauseVideo', () => {
      comp.pauseVideo();
      expect(comp.isStopped).toBeFalsy();
      expect(comp.isPlaying).toBeFalsy();
      expect(comp.videoElement.nativeElement.pause).toHaveBeenCalled();
    });

    it('stopVideo', () => {
      comp.stopVideo();
      expect(comp.videoElement.nativeElement.poster).toBe(comp.posterUrl);
      expect(comp.setCurrentVideo).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.isStopped).toBeTruthy();
      expect(comp.isPlaying).toBeFalsy();
    });
  });
});