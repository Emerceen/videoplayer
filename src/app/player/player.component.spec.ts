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
  });

  describe('endedRepeatedCurrentVideoEventHandler() should', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'play');
    });

    it('call videoElement.nativeElement.play()', () => {
      comp.endedRepeatedCurrentVideoEventHandler();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
    });
  });

  describe('endedRepeatedPlaylistEventHandler() should', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
      spyOn(comp, 'callPlayVideo');
      spyOn(comp, 'endedRepeatedCurrentVideoEventHandler');
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.videos = communication.videoService.videoUrlsMock.videos;
    });

    afterAll(() => {
      comp.currentVideo = undefined;
      comp.videos = undefined;
    });

    it('setCurrentVideo with parameter, load, call callPlayVideo() when index currentVideo of videos is 0', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });

    it('setCurrentVideo without parameter, load, call callPlayVideo() when index currentVideo of videos is 3', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[3];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo).toHaveBeenCalledWith();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo).toHaveBeenCalled();
    });
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.playerControlsComponent, 'playVideo');
      spyOn(comp.playerControlsComponent, 'stopVideo');
      spyOn(comp, 'endedRepeatedCurrentVideoEventHandler');
      spyOn(comp, 'endedRepeatedPlaylistEventHandler');
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

    describe('in method repeatCurrentVideo, and when', () => {
      it('repeated control is false and video call ended event handler should call endedRepeatedCurrentVideoEventHandler', () => {
        comp.repeatCurrentVideo();
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedRepeatedCurrentVideoEventHandler).toHaveBeenCalled();
        expect(comp.videoControls.repeated).toBeTruthy();
      });

      it('repeated control is true and video call ended event handler should call endedEventHandler', () => {
        comp.videoControls.repeated = true;
        comp.repeatCurrentVideo();
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedEventHandler).toHaveBeenCalled();
        expect(comp.videoControls.repeated).toBeFalsy();
      });
    });

    describe('in method repeatPlaylist, and when', () => {
      it('isRepeatedPlaylist, argument are falsy and video call ended event handler should call endedRepeatedPlaylistEventHandler()',
        () => {
        comp.isRepeatedPlaylist = false;
        comp.repeatPlaylist(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedRepeatedPlaylistEventHandler).toHaveBeenCalled();
        expect(comp.isRepeatedPlaylist).toBeTruthy();
      });

      it('isRepeatedPlaylist is truthy, argument is falsy and video call ended event handler should call endedEventHandler', () => {
        comp.isRepeatedPlaylist = true;
        comp.videoElement.nativeElement.autoplay = true;
        comp.repeatPlaylist(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedEventHandler).toHaveBeenCalled();
        expect(comp.isRepeatedPlaylist).toBeFalsy();
      });

      it('argument is truthy, sholud return undefined', () => {
        expect(comp.repeatPlaylist(true)).toBeUndefined();
      });
    });
  });

  describe('shufflePlay()', () => {
    beforeEach(() => {
      comp.videos = communication.videoService.videoUrlsMock.videos;
      comp.setCurrentVideo();
      spyOn(comp, 'initialRandomVideo');
    });
    describe('when parameter isEnable is truthy', () => {
      describe('and when comp.videoControls.played is', () => {

        it('falsy should call initialRandomVideo()', () => {
          comp.videoControls.played = false;
          comp.shufflePlay(true);
          expect(comp.initialRandomVideo).toHaveBeenCalled();
        });

        it('truthy should not call initialRandomVideo()', () => {
          comp.videoControls.played = true;
          comp.shufflePlay(true);
          expect(comp.initialRandomVideo).toHaveBeenCalledTimes(0);
        });

        describe('and should set onended method', () => {
          describe('that should set videoControls.playedInShuffle to true',
            () => {
            it('', () => {
              comp.shufflePlay(true);
              comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
              expect(comp.currentVideo.playedInShuffle).toBeTruthy();
            });

            describe('and when videos array filter by video.control.playedInShuffle length is greater than 0', () => {
              it('should call endedEventHandler() with random number', () => {
                spyOn(comp, 'endedEventHandler');
                comp.shufflePlay(true);
                comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                expect(comp.endedEventHandler).toHaveBeenCalled();
              });
            });

            describe('and when videos array filter by video.control.playedInShuffle length is less than 0', () => {
              beforeEach(() => {
                spyOn(comp, 'callStopVideo');
                spyOn(comp, 'resetShufflePlaying');
                spyOn(comp, 'callPlayVideo');
                comp.videos.map(videos => {
                  videos.playedInShuffle = true;
                });
              });

              describe('and isRepeatedPlaylist is truthy', () => {
                beforeEach(() => {
                  comp.isRepeatedPlaylist = true;
                });

                it('should call stopVideo(), resetShufflePlaying(), initialRandomVideo()', () => {
                  comp.shufflePlay(true);
                  comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                  expect(comp.resetShufflePlaying).toHaveBeenCalled();
                  expect(comp.initialRandomVideo).toHaveBeenCalled();
                  expect(comp.callPlayVideo).toHaveBeenCalled();
                });
              });

              describe('and isRepeatedPlaylist is falsy', () => {
                beforeEach(() => {
                  comp.isRepeatedPlaylist = false;
                });

                it('should call stopVideo(), resetShufflePlaying(), initialRandomVideo()', () => {
                  comp.shufflePlay(true);
                  comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                  expect(comp.callStopVideo).toHaveBeenCalled();
                  expect(comp.resetShufflePlaying).toHaveBeenCalled();
                  expect(comp.initialRandomVideo).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });

    describe('when parameter isEnable is falsy should set onended method', () => {
      beforeEach(() => {
        spyOn(comp, 'endedEventHandler');
        spyOn(comp, 'resetShufflePlaying');
      });

      it('that should call endedEventHandler() without argument', () => {
        comp.shufflePlay(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedEventHandler).toHaveBeenCalledWith();
      });

      it('and call resetShufflePlaying()', () => {
        comp.shufflePlay(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.resetShufflePlaying).toHaveBeenCalled();
      });
    });
  });

  describe('initialRandomVideo() should set properties', () => {
    beforeEach(() => {
      comp.videos = communication.videoService.videoUrlsMock.videos;
      comp.setCurrentVideo();
    });

    it('', () => {
      comp.initialRandomVideo();
      expect(comp.videoControls.stopped).toBeTruthy();
      expect(comp.videoControls.played).toBeFalsy();
    });

    it('and call setCurrentVideo with randomNumber', () => {
      spyOn(comp, 'setCurrentVideo');
      comp.initialRandomVideo();
      expect(comp.setCurrentVideo).toHaveBeenCalled();
    });

    it('and call comp.videoElement.nativeElement.load()', () => {
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.initialRandomVideo();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
    });
  });

  describe('resetShufflePlaying() should map array videos, anvideoControls.playedInShuffle set to falsy', () => {
    beforeEach(() => {
      comp.videos = communication.videoService.videoUrlsMock.videos;
      comp.videos.map(video => video.playedInShuffle = true);
    });

    it('', () => {
      comp.resetShufflePlaying();
      expect(comp.videos[0].playedInShuffle).toBeFalsy();
      expect(comp.videos[3].playedInShuffle).toBeFalsy();
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
});
