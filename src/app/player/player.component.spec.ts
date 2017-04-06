import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Communication } from '../services/communication';
import { MockCommunication } from '../services/mock-communication';
import { DocumentMozMsPrefixesRefService } from '../services/document.service';

import { ElementStub } from './../mock/element-stub.spec';
import { EventStub } from './../mock/event-stub.spec';
import { DocumentMock } from './../mock/document-mock.spec';

import { PlayerComponent, PlayerModule } from './index';

@Component({
  selector: 'as-test',
  template: '<as-player></as-player>'
})

class TestComponent {
}

let comp: PlayerComponent;
let fixture: ComponentFixture<PlayerComponent>;
let communication: any;
let sanitizer: DomSanitizer;
let element = new ElementStub();
let mediaStreamErrorEvent: MediaStreamErrorEvent = undefined;
let documentMock: DocumentMozMsPrefixesRefService;

describe('PlayerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerModule],
      providers: [
        { provide: Communication, useClass: MockCommunication },
        DomSanitizer,
        { provide: DocumentMozMsPrefixesRefService, useClass: DocumentMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
    sanitizer = fixture.debugElement.injector.get(DomSanitizer);
    documentMock = fixture.debugElement.injector.get(DocumentMozMsPrefixesRefService);
    comp.videoElement = <ElementRef> element;
    comp.videoWrapperElement = <ElementRef> element;
    comp.playerSettingsComponent = <ElementRef> element;
    comp.playerControlsComponent = <any> element;
  });

  it('ngOnInit should call getVideoUrls,', () => {
    spyOn(comp, 'getVideoUrls');
    comp.ngOnInit();
    expect(comp.getVideoUrls).toHaveBeenCalled();
  });

  describe('videoElement should', () => {
    it('set private member and set onended event handler when element is defined', () => {
      spyOn(comp, 'endedEventHandler');
      comp.videoElement = <ElementRef> element;
      comp.videos = communication.videoService.videoUrlsMock.videos;
      expect(comp.videoElement.nativeElement.onended).toBeDefined();
      comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
      expect(comp.endedEventHandler).toHaveBeenCalled();
    });

    it('do nothing when element is undefined', () => {
      comp.videoElement.nativeElement.onended = undefined;
      comp.videoElement = undefined;
      expect(comp.videoElement.nativeElement.onended).toBeUndefined();
    });
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
        expect(comp.currentVideo).toBe(comp.videos[0]);
      });

      it('when index parameter is 3', () => {
        comp.setCurrentVideo(3);
        expect(comp.currentVideo).toBe(comp.videos[3]);
      });
    });
  });

  describe('endedEventHandler should call event.preventDefault and call', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
      spyOn(comp, 'callStopVideo');
      spyOn(comp, 'callPlayVideo');
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.videos = communication.videoService.videoUrlsMock.videos;
    });

    afterAll(() => {
      comp.currentVideo = undefined;
      comp.videos = undefined;
    });

    it('setCurrentVideo, load, play when index currentVideo of videos is 0', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
      comp.endedEventHandler();
      expect(comp.setCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });

    it('load, stopVideo when index currentVideo of videos is 3', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[3];
      comp.endedEventHandler();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callStopVideo).toHaveBeenCalled();
    });

    it('setCurrentVideo, load, play when argument is passed', () => {
      comp.endedEventHandler(1);
      expect(comp.setCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.playerControlsComponent, 'playVideo');
      spyOn(comp.playerControlsComponent, 'stopVideo');
      spyOn(comp, 'endedEventHandler');
      spyOn(comp, 'setCurrentVideo');
      comp.videos = communication.videoService.videoUrlsMock.videos;
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
    });

    it('in method callPlayVideo', () => {
      comp.callPlayVideo();
      expect(comp.playerControlsComponent.playVideo).toHaveBeenCalled();
    });

    it('in method callStopVideo', () => {
      comp.callStopVideo();
      expect(comp.playerControlsComponent.stopVideo).toHaveBeenCalled();
    });
  });

  describe('document click should call comp.clickout', () => {
    beforeEach(() => {
      spyOn(comp, 'clickout');
    });

    it('', () => {
      fixture.detectChanges();
      let mainContainer = fixture.nativeElement.querySelector('.main');
      mainContainer.click();
      expect(comp.clickout).toHaveBeenCalled();
    });
  });

  describe('clickout should set playerSetting to false, when', () => {
    let eventStub = new EventStub();

    beforeEach(() => {
      comp.playerSettings = true;
      eventStub.target.className.includesValue = false;
      comp.playerSettingsComponent.nativeElement.containsValue = false;
    });

    it('... .contains and ... .includes return falsy', () => {
      comp.clickout(eventStub);
      expect(comp.playerSettings).toBeFalsy();
    });

    it('... .contains return true', () => {
      comp.playerSettingsComponent.nativeElement.containsValue = true;
      comp.clickout(eventStub);
      expect(comp.playerSettings).toBeTruthy();
    });

    it('... .includes return true', () => {
      eventStub.target.className.includesValue = true;
      comp.clickout(eventStub);
      expect(comp.playerSettings).toBeTruthy();
    });
  });

  describe('setPlayedInShuffle should set playedInShuffle of currentVideo, to', () => {
    beforeEach(() => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
    });

    it('true', () => {
      comp.setPlayedInShuffle(true);
      expect(comp.currentVideo.playedInShuffle).toBeTruthy();
    });

    it('false', () => {
      comp.setPlayedInShuffle(false);
      expect(comp.currentVideo.playedInShuffle).toBeFalsy();
    });
  });
});
