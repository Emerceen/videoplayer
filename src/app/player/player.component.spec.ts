import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Communication } from '../services/communication';
import { MockCommunication } from '../services/mock-communication';

import { PlayerComponent, PlayerModule } from './index';


class SanitizerStub {
  public bypassSecurityTrustUrl(url: string): string {
    return url;
  }
}

class ElementStub {
  nativeElement: Object = {
    poster: '',
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
let element = new ElementStub();
let mediaStreamErrorEvent: MediaStreamErrorEvent = undefined;

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
    comp.videoElement = <ElementRef> element;
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

  describe('endedEventHandler should call event.preventDefault and call', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
      spyOn(comp, 'stopVideo');
      spyOn(comp, 'playVideo');
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
      expect(comp.playVideo).toHaveBeenCalled();
    });

    it('load, stopVideo when index currentVideo of videos is 3', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[3];
      comp.endedEventHandler();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.stopVideo).toHaveBeenCalled();
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
      spyOn(comp, 'playVideo');
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.videos = communication.videoService.videoUrlsMock.videos;
    });

    afterAll(() => {
      comp.currentVideo = undefined;
      comp.videos = undefined;
    });

    it('setCurrentVideo with parameter, load, call playVideo() when index currentVideo of videos is 0', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.playVideo).toHaveBeenCalled();
    });

    it('setCurrentVideo without parameter, load, call playVideo() when index currentVideo of videos is 3', () => {
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[3];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo).toHaveBeenCalledWith();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.playVideo).toHaveBeenCalled();
    });
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'load');
      spyOn(comp.videoElement.nativeElement, 'play');
      spyOn(comp.videoElement.nativeElement, 'pause');
      spyOn(comp, 'endedRepeatedCurrentVideoEventHandler');
      spyOn(comp, 'endedRepeatedPlaylistEventHandler');
      spyOn(comp, 'endedEventHandler');
      spyOn(comp, 'setCurrentVideo');
      comp.currentVideo = communication.videoService.videoUrlsMock.videos[0];
    });

    afterEach(() => {
      comp.videoElement.nativeElement.poster = '';
      comp.currentVideo.controls.stopped = true;
      comp.currentVideo.controls.played = false;
      comp.currentVideo.controls.repeated = false;
    });

    it('in method playVideo', () => {
      comp.videoElement.nativeElement.poster = 'example';
      comp.playVideo();
      expect(comp.currentVideo.controls.stopped).toBeFalsy();
      expect(comp.currentVideo.controls.played).toBeTruthy();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.poster).toBe('');
    });

    it('in method pauseVideo', () => {
      comp.pauseVideo();
      expect(comp.currentVideo.controls.stopped).toBeFalsy();
      expect(comp.currentVideo.controls.played).toBeFalsy();
      expect(comp.videoElement.nativeElement.pause).toHaveBeenCalled();
    });

    it('in method stopVideo', () => {
      comp.stopVideo();
      expect(comp.videoElement.nativeElement.poster).toBe(comp.posterUrl);
      expect(comp.setCurrentVideo).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.currentVideo.controls.stopped).toBeTruthy();
      expect(comp.currentVideo.controls.played).toBeFalsy();
    });

    describe('in method repeatCurrentVideo, and when', () => {
      it('repeated control is false and video call ended event handler should call endedRepeatedCurrentVideoEventHandler', () => {
        comp.repeatCurrentVideo();
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedRepeatedCurrentVideoEventHandler).toHaveBeenCalled();
        expect(comp.currentVideo.controls.repeated).toBeTruthy();
      });

      it('repeated control is true and video call ended event handler should call endedEventHandler', () => {
        comp.currentVideo.controls.repeated = true;
        comp.repeatCurrentVideo();
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedEventHandler).toHaveBeenCalled();
        expect(comp.currentVideo.controls.repeated).toBeFalsy();
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
      describe('and when this.currentVideo.controls.played is', () => {

        it('falsy should call initialRandomVideo()', () => {
          comp.currentVideo.controls.played = false;
          comp.shufflePlay(true);
          expect(comp.initialRandomVideo).toHaveBeenCalled();
        });

        it('truthy should not call initialRandomVideo()', () => {
          comp.currentVideo.controls.played = true;
          comp.shufflePlay(true);
          expect(comp.initialRandomVideo).toHaveBeenCalledTimes(0);
        });

        describe('and should set onended method', () => {
          describe('that should set currentVideo.controls.playedInShuffle to true',
            () => {
            it('', () => {
              comp.shufflePlay(true);
              comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
              expect(comp.currentVideo.controls.playedInShuffle).toBeTruthy();
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
                spyOn(comp, 'stopVideo');
                spyOn(comp, 'resetShufflePlaying');
                spyOn(comp, 'playVideo');
                comp.videos.map(videos => {
                  videos.controls.playedInShuffle = true;
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
                  expect(comp.playVideo).toHaveBeenCalled();
                });
              });

              describe('and isRepeatedPlaylist is falsy', () => {
                beforeEach(() => {
                  comp.isRepeatedPlaylist = false;
                });

                it('should call stopVideo(), resetShufflePlaying(), initialRandomVideo()', () => {
                  comp.shufflePlay(true);
                  comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                  expect(comp.stopVideo).toHaveBeenCalled();
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
      expect(comp.currentVideo.controls.stopped).toBeTruthy();
      expect(comp.currentVideo.controls.played).toBeFalsy();
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

  describe('resetShufflePlaying() should map array videos, and each video.controls.playedInShuffle set to falsy', () => {
    beforeEach(() => {
      comp.videos = communication.videoService.videoUrlsMock.videos;
      comp.videos.map(video => {
        video.controls.playedInShuffle = true;
      });
    });

    it('', () => {
      comp.resetShufflePlaying();
      expect(comp.videos[0].controls.playedInShuffle).toBeFalsy();
      expect(comp.videos[3].controls.playedInShuffle).toBeFalsy();
    });
  });

  describe('changeStatePlayerSettings() should set playerSettings as its opposite', () => {
      it('true to false', () => {
        comp.playerSettings = true;
        comp.changeStatePlayerSettings();
        expect(comp.playerSettings).toBeFalsy();
      });

      it('false to true', () => {
        comp.playerSettings = false;
        comp.changeStatePlayerSettings();
        expect(comp.playerSettings).toBeTruthy();
      });
    });
});
