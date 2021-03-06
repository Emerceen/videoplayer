import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { VideoService } from '../services/video.service';
import { DocumentMozMsPrefixesRefService } from '../services/document.service';
import { BufferingStateService } from './../services/buffering-state.service';

import { MockCommunication } from '../mock/communication-mock';
import { ElementStub } from './../mock/element-stub.spec';
import { EventStub } from './../mock/event-stub.spec';
import { DocumentMock } from './../mock/document-mock.spec';

import { PlayerComponent, PlayerModule } from './index';

@Component({
  selector: 'app-test',
  template: '<app-player></app-player>'
})

class TestComponent {
}

let comp: PlayerComponent;
let changeDetectorRef: ChangeDetectorRef;
let fixture: ComponentFixture<PlayerComponent>;
const communication: MockCommunication = new MockCommunication();
let videoService: VideoService;
let bufferingStateService: BufferingStateService;
let sanitizer: DomSanitizer;
const element = new ElementStub();
const mediaStreamErrorEvent: MediaStreamErrorEvent = undefined;
let documentMock: DocumentMozMsPrefixesRefService;

describe('PlayerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerModule],
      providers: [
        DomSanitizer,
        ChangeDetectorRef,
        BufferingStateService,
        { provide: DocumentMozMsPrefixesRefService, useClass: DocumentMock },
        VideoService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    comp = fixture.componentInstance;
    bufferingStateService = fixture.debugElement.injector.get(BufferingStateService);
    videoService = fixture.debugElement.injector.get(VideoService);
    sanitizer = fixture.debugElement.injector.get(DomSanitizer);
    documentMock = fixture.debugElement.injector.get(DocumentMozMsPrefixesRefService);
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    comp.videoElement = <ElementRef> element;
    comp.videoWrapperElement = <ElementRef> element;
    comp.playerSettingsElement = <ElementRef> element;
    comp.playerControlsComponent = <any> element;
  });

  it('ngOnInit should call getBufferingState,', () => {
    spyOn(comp, 'getBufferingState');
    comp.ngOnInit();
    expect(comp.getBufferingState).toHaveBeenCalled();
  });

  describe('videoElement should', () => {
    it('set private member and call defineOnendedFunction() when element is defined', () => {
      spyOn(comp, 'endedEventHandler');
      spyOn(comp, 'defineOnendedFunction');
      comp.videoElement = <ElementRef> element;
      comp.videos = communication.videoDataService.videoUrlsMock.videos;
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
      expect(comp.videoElement.nativeElement.onended).toBeDefined();

      comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
      expect(comp.endedEventHandler).toHaveBeenCalled();
      expect(comp.defineOnendedFunction).toHaveBeenCalled();
    });

    it('do nothing when element is undefined', () => {
      comp.videoElement.nativeElement.onended = undefined;
      comp.videoElement = undefined;
      expect(comp.videoElement.nativeElement.onended).toBeUndefined();
    });
  });

  describe('endedEventHandler should call event.preventDefault and call', () => {
    beforeEach(() => {
      spyOn(videoService, 'changeCurrentVideo');
      spyOn(comp, 'callStopVideo');
      spyOn(comp, 'callPlayVideo');
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.videos = communication.videoDataService.videoUrlsMock.videos;
    });

    afterAll(() => {
      comp.currentVideo = undefined;
      comp.videos = undefined;
    });

    it('setCurrentVideo, load, play when index currentVideo of videos is 0', () => {
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
      comp.endedEventHandler();
      expect(videoService.changeCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });

    it('load, stopVideo when index currentVideo of videos is 3', () => {
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[3];
      comp.endedEventHandler();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callStopVideo).toHaveBeenCalled();
    });

    it('setCurrentVideo, load, play when argument is passed', () => {
      comp.endedEventHandler(1);
      expect(videoService.changeCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.playerControlsComponent, 'playVideo');
      spyOn(comp.playerControlsComponent, 'stopVideo');
      spyOn(comp, 'endedEventHandler');
      comp.videos = communication.videoDataService.videoUrlsMock.videos;
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
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
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
    });

    it('', () => {
      fixture.detectChanges();
      const mainContainer = fixture.nativeElement.querySelector('section');
      mainContainer.click();
      expect(comp.clickout).toHaveBeenCalled();
    });
  });

  describe('clickout should set playerSetting to false, when', () => {
    const eventStub = new EventStub();

    beforeEach(() => {
      comp.playerSettings = true;
      eventStub.target.className.includesValue = false;
      comp.playerSettingsElement.nativeElement.containsValue = false;
    });

    it('... .contains and ... .includes return falsy', () => {
      comp.clickout(eventStub);
      expect(comp.playerSettings).toBeFalsy();
    });

    it('... .contains return true', () => {
      comp.playerSettingsElement.nativeElement.containsValue = true;
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
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
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

  describe('initialOnendedFunction should return closure function, which can only define onended once', () => {
    it('can only be done once', () => {
      spyOn(comp, 'setEndedEventHandler');
      const closure = comp.initialOnendedFunction();
      closure();
      expect(comp.setEndedEventHandler).toHaveBeenCalled();
    });
    it('can`t define onended more than one', () => {
      const closure = comp.initialOnendedFunction();
      closure();
      spyOn(comp, 'setEndedEventHandler');
      closure();
      expect(comp.setEndedEventHandler).toHaveBeenCalledTimes(0);
    });
  });

  describe('getBufferingState', () => {
    it('should call event subscribe and set bufferingState to true', () => {
      comp.getBufferingState();
      bufferingStateService.publish(true);
      expect(comp.bufferingState).toBeTruthy();
    });
  });

  describe('getChangesPlayedVideo', () => {
    beforeEach(() => {
      spyOn(comp.playerControlsComponent, 'playVideo');
      spyOn(comp.playerControlsComponent, 'stopVideo');
      spyOn(videoService, 'changeCurrentVideo');
    });

    it('should call playedVideoIndexOnChange subscribe and callchangeCurrentVideo, stopVideo, playVideo', () => {
      comp.getChangesPlayedVideo();
      videoService.changePlayedVideo(1);
      expect(comp.playerControlsComponent.stopVideo).toHaveBeenCalled();
      expect(videoService.changeCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.playerControlsComponent.playVideo).toHaveBeenCalled();
    });
  });
});
