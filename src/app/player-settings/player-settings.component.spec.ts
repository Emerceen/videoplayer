import { VideoControls } from './../entities/video-controls';
import { ElementStub } from './../mock/element-stub.spec';
import { MockCommunication } from './../services/mock-communication';
import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
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
let element = new ElementStub();
let repeatVideoLiteral = 'repeatVideo';
let shufflePlayLiteral = 'shufflePlay';
let repeatPlaylistLiteral = 'repeatPlaylist';
let mediaStreamErrorEvent: MediaStreamErrorEvent = undefined;

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
    comp.videoElement = <ElementRef> element;
    comp.videoControls = new VideoControls();
    comp.videos = new MockCommunication().videoService.videoUrlsMock.videos;
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
      spyOn(comp, 'repeatCurrentVideo');
    });

    it('and value and repeatPlaylist value are false then emit() method of repeatCurrentVideo Output should call', () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });

    it('and value is true and repeatPlaylist value is false then emit() method of repeatCurrentVideo Output should call', () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });

    it('and value and shufflePlaylist value are false then emit() method of repeatCurrentVideo Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

    it('and value is true and shufflePlaylist value is false then emit() method of repeatCurrentVideo Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

     it('and value and shufflePlaylist value are true then call repeatCurrentVideo should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[shufflePlayLiteral].value).toBeFalsy();
    });

    it(`and value is true and repeatPlaylist, shufflePalylist values are true then emit() 
    method of repeatCurrentVideo Output should call`, () => {
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      expect(comp.repeatCurrentVideo).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatPlaylistLiteral].value).toBeFalsy();
    });
  });

  describe('when repeatPlaylist FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp, 'repeatPlaylist');
    });

    it('and value and repeatVideo value are falsy then emit() method of repeatPlaylistClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylist).toHaveBeenCalled();
    });

    it('and value is falsy and repeatVideo value is true then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylist).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeTruthy();
    });

    it('and value and shufflePlay value are falsy then emit() method of repeatPlaylistClickEventHandler Output should call', () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      expect(comp.repeatPlaylist).toHaveBeenCalled();
    });

    it('and value is truthy and shufflePlay value is truthy then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      expect(comp.repeatPlaylist).toHaveBeenCalledWith(true);
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
    });

    it('and value and repeatVideo value are truthy then emit() method of repeatPlaylistClickEventHandler Output should call',
      () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      expect(comp.repeatPlaylist).toHaveBeenCalled();
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
    });
  });

  describe('when shufflePlay FormControl value is changed', () => {
    beforeEach(() => {
      spyOn(comp, 'shufflePlay');
    });

    it('and value and other controls are falsy, then should emit false on shufflePlayClickEventHandler', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(false);
      expect(comp.shufflePlay).toHaveBeenCalledWith(false);
    });

    it('and value and repeatVideo are truthy, then should setValue of repeatVideo to falsy, and emit true', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(true);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(false);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      expect(comp.playerSettingsForm.controls[repeatVideoLiteral].value).toBeFalsy();
      expect(comp.shufflePlay).toHaveBeenCalledWith(true);
    });

    it('and value and repeatPlaylist are truthy, then should emit true', () => {
      comp.playerSettingsForm.controls[repeatVideoLiteral].setValue(false);
      comp.playerSettingsForm.controls[repeatPlaylistLiteral].setValue(true);
      comp.playerSettingsForm.controls[shufflePlayLiteral].setValue(true);
      expect(comp.shufflePlay).toHaveBeenCalledWith(true);
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
      spyOn(comp.setCurrentVideo, 'emit');
      spyOn(comp.callPlayVideo, 'emit');
      spyOn(comp, 'endedRepeatedCurrentVideoEventHandler');
      spyOn(comp.videoElement.nativeElement, 'load');
      comp.videos = new MockCommunication().videoService.videoUrlsMock.videos;
    });

    afterAll(() => {
      comp.currentVideo = undefined;
      comp.videos = undefined;
    });

    it('setCurrentVideo with parameter, load, call callPlayVideo() when index currentVideo of videos is 0', () => {
      comp.currentVideo = comp.videos[0];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo.emit).toHaveBeenCalledWith(1);
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo.emit).toHaveBeenCalled();
    });

    it('setCurrentVideo without parameter, load, call callPlayVideo() when index currentVideo of videos is 3', () => {
      comp.currentVideo = comp.videos[3];
      comp.endedRepeatedPlaylistEventHandler();
      expect(comp.setCurrentVideo.emit).toHaveBeenCalledWith();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.callPlayVideo.emit).toHaveBeenCalled();
    });
  });

    describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp, 'endedRepeatedCurrentVideoEventHandler');
      spyOn(comp, 'endedRepeatedPlaylistEventHandler');
      spyOn(comp.endedEventHandler, 'emit');
      spyOn(comp, 'setCurrentVideo');
      comp.videos = new MockCommunication().videoService.videoUrlsMock.videos;
      comp.currentVideo = new MockCommunication().videoService.videoUrlsMock.videos[0];
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
        expect(comp.endedEventHandler.emit).toHaveBeenCalled();
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
        expect(comp.endedEventHandler.emit).toHaveBeenCalled();
        expect(comp.isRepeatedPlaylist).toBeFalsy();
      });

      it('argument is truthy, sholud return undefined', () => {
        expect(comp.repeatPlaylist(true)).toBeUndefined();
      });
    });
  });

  describe('resetShufflePlaying() should map array videos, anvideoControls.playedInShuffle set to falsy', () => {
    beforeEach(() => {
      comp.videos = new MockCommunication().videoService.videoUrlsMock.videos;
      comp.videos.map(video => video.playedInShuffle = true);
    });

    it('', () => {
      comp.resetShufflePlaying();
      expect(comp.videos[0].playedInShuffle).toBeFalsy();
      expect(comp.videos[3].playedInShuffle).toBeFalsy();
    });
  });

  describe('shufflePlay()', () => {

    beforeEach(() => {
      comp.videos = new MockCommunication().videoService.videoUrlsMock.videos;
      comp.currentVideo = comp.videos[0];
      spyOn(comp, 'initialRandomVideo');
      spyOn(comp.endedEventHandler, 'emit');
      spyOn(comp.setPlayedInShuffle , 'emit');
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
              expect(comp.setPlayedInShuffle.emit).toHaveBeenCalledWith(true);
            });

            describe('and when videos array filter by video.control.playedInShuffle length is greater than 0', () => {
              it('should call endedEventHandler() with random number', () => {
                spyOn(comp, 'endedEventHandler');
                comp.shufflePlay(true);
                comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                expect(comp.endedEventHandler.emit).toHaveBeenCalled();
              });
            });

            describe('and when videos array filter by video.control.playedInShuffle length is less than 0', () => {
              beforeEach(() => {
                spyOn(comp.callStopVideo, 'emit');
                spyOn(comp, 'resetShufflePlaying');
                spyOn(comp.callPlayVideo, 'emit');
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
                  expect(comp.callPlayVideo.emit).toHaveBeenCalled();
                });
              });

              describe('and isRepeatedPlaylist is falsy', () => {
                beforeEach(() => {
                  comp.isRepeatedPlaylist = false;
                });

                it('should call stopVideo(), resetShufflePlaying(), initialRandomVideo()', () => {
                  comp.shufflePlay(true);
                  comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
                  expect(comp.callStopVideo.emit).toHaveBeenCalled();
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
        spyOn(comp, 'resetShufflePlaying');
      });

      it('that should call endedEventHandler() without argument', () => {
        comp.shufflePlay(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.endedEventHandler.emit).toHaveBeenCalledWith();
      });

      it('and call resetShufflePlaying()', () => {
        comp.shufflePlay(false);
        comp.videoElement.nativeElement.onended(mediaStreamErrorEvent);
        expect(comp.resetShufflePlaying).toHaveBeenCalled();
      });
    });
  });
});
