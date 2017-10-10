
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { Component, ElementRef } from '@angular/core';

import { DocumentMozMsPrefixesRefService } from '../services/document.service';
import { BufferingStateService } from './../services/buffering-state.service';
import { VideoService } from './../services/video.service';

import { PlayerControlsComponent, PlayerControlsModule } from './index';

import { VideoControls } from './../entities/video-controls';
import { DocumentMock } from './../mock/document-mock.spec';
import { ElementStub } from './../mock/element-stub.spec';

@Component({
  selector: 'app-test',
  template: '<app-player-controls></app-player-controls>'
})

class TestComponent {
}

let comp: PlayerControlsComponent;
let videoService: VideoService;
let fixture: ComponentFixture<PlayerControlsComponent>;
const element = new ElementStub();
let documentMock: DocumentMozMsPrefixesRefService;

describe('PlayerControlsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PlayerControlsModule],
      providers: [
        VideoService,
        { provide: DocumentMozMsPrefixesRefService, useClass: DocumentMock },
        BufferingStateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControlsComponent);
    comp = fixture.componentInstance;
    documentMock = fixture.debugElement.injector.get(DocumentMozMsPrefixesRefService);
    videoService = fixture.debugElement.injector.get(VideoService);
    comp.videoElement = <ElementRef> element;
    comp.videoWrapperElement = <ElementRef> element;
    comp.videoControls = new VideoControls();
  });

  describe('action methods should set properties of component', () => {
    beforeEach(() => {
      spyOn(comp.videoElement.nativeElement, 'load');
      spyOn(comp.videoElement.nativeElement, 'play');
      spyOn(comp.videoElement.nativeElement, 'pause');
      spyOn(comp, 'emitVideoControls');
      spyOn(videoService, 'changeCurrentVideo');
    });

    afterEach(() => {
      comp.videoElement.nativeElement.poster = '';
      comp.videoControls.stopped = true;
      comp.videoControls.played = false;
      comp.videoControls.repeated = false;
    });

    it('in method playVideo', () => {
      comp.videoElement.nativeElement.poster = 'example';
      comp.playVideo();
      expect(comp.videoControls.stopped).toBeFalsy();
      expect(comp.videoControls.played).toBeTruthy();
      expect(comp.videoElement.nativeElement.play).toHaveBeenCalled();
      expect(comp.emitVideoControls).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.poster).toBe('');
    });

    it('in method pauseVideo', () => {
      comp.pauseVideo();
      expect(comp.videoControls.stopped).toBeFalsy();
      expect(comp.videoControls.played).toBeFalsy();
      expect(comp.emitVideoControls).toHaveBeenCalled();
      expect(comp.videoElement.nativeElement.pause).toHaveBeenCalled();
    });

    it('in method stopVideo', () => {
      comp.stopVideo();
      expect(comp.videoElement.nativeElement.poster).toBe(comp.posterUrl);
      expect(videoService.changeCurrentVideo).toHaveBeenCalledWith();
      expect(comp.videoElement.nativeElement.load).toHaveBeenCalled();
      expect(comp.emitVideoControls).toHaveBeenCalled();
      expect(comp.videoControls.stopped).toBeTruthy();
      expect(comp.videoControls.played).toBeFalsy();
    });
  });

  it('emitVideoControls should call videoControlsChange.emit() with videoControls', () => {
    spyOn(comp.videoControlsChange, 'emit');
    comp.emitVideoControls();
    expect(comp.videoControlsChange.emit).toHaveBeenCalledWith(comp.videoControls);
  });

  describe(`changeStatePlayerSettings should `, () => {
    beforeEach(() => {
      comp.playerSettings = false;
      spyOn(comp.playerSettingsChange, 'emit');
    });

    it('set playerSettings as the opposite, and  call playerSettingsChange.emit() with this.playerSettings', () => {
      comp.changeStatePlayerSettings();
      expect(comp.playerSettings).toBeTruthy();
      expect(comp.playerSettingsChange.emit).toHaveBeenCalledWith(true);
    });
  });
  describe('toggleFullScreen()', () => {
    describe('when isFullScreen is falsy', () => {
      beforeEach(() => {
        comp.isFullScreen = false;
        comp.videoWrapperElement.nativeElement.webkitRequestFullScreen = undefined;
        comp.videoWrapperElement.nativeElement.requestFullScreen = undefined;
        comp.videoWrapperElement.nativeElement.mozRequestFullScreen = undefined;
        comp.videoWrapperElement.nativeElement.msRequestFullscreen = undefined;
      });
      describe('and videoElement.nativeElement has method', () => {

        it('webkitRequestFullScreen, should call it', () => {
          comp.videoWrapperElement.nativeElement.webkitRequestFullScreen = () => { return; };
          spyOn(comp.videoWrapperElement.nativeElement, 'webkitRequestFullScreen');
          comp.toggleFullScreen();
          expect(comp.videoWrapperElement.nativeElement.webkitRequestFullScreen).toHaveBeenCalled();
        });

        it('requestFullScreen, should call it', () => {
          comp.videoWrapperElement.nativeElement.requestFullScreen = () => { return; };
          spyOn(comp.videoWrapperElement.nativeElement, 'requestFullScreen');
          comp.toggleFullScreen();
          expect(comp.videoWrapperElement.nativeElement.requestFullScreen).toHaveBeenCalled();
        });

        it('mozRequestFullScreen, should call it', () => {
          comp.videoWrapperElement.nativeElement.mozRequestFullScreen = () => { return; };
          spyOn(comp.videoWrapperElement.nativeElement, 'mozRequestFullScreen');
          comp.toggleFullScreen();
          expect(comp.videoWrapperElement.nativeElement.mozRequestFullScreen).toHaveBeenCalled();
        });

        it('msRequestFullscreen, should call it', () => {
          comp.videoWrapperElement.nativeElement.msRequestFullscreen = () => { return; };
          spyOn(comp.videoWrapperElement.nativeElement, 'msRequestFullscreen');
          comp.toggleFullScreen();
          expect(comp.videoWrapperElement.nativeElement.msRequestFullscreen).toHaveBeenCalled();
        });


      });
      describe('and videoElement.nativeElement hasn`t fullScreen methods', () => {
        it('should return null', () => {
          comp.videoWrapperElement.nativeElement.webkitRequestFullScreen = undefined;
          comp.videoWrapperElement.nativeElement.requestFullScreen = undefined;
          comp.videoWrapperElement.nativeElement.mozRequestFullScreen = undefined;
          comp.videoWrapperElement.nativeElement.msRequestFullscreen = undefined;
          expect(comp.toggleFullScreen()).toBeUndefined();
        });
      });
    });

    describe('when isFullScreen is truthy', () => {
      beforeEach(() => {
        comp.isFullScreen = true;
        documentMock.nativeDocument.webkitExitFullscreen = undefined;
        documentMock.nativeDocument.exitFullscreen = undefined;
        documentMock.nativeDocument.mozCancelFullScreen = undefined;
        documentMock.nativeDocument.msExitFullscreen = undefined;
      });

      it('and document has method webkitExitFullscreen, should call it', () => {
        documentMock.nativeDocument.webkitExitFullscreen = () => { return; };
        spyOn(documentMock.nativeDocument, 'webkitExitFullscreen');
        comp.toggleFullScreen();
        expect(documentMock.nativeDocument.webkitExitFullscreen).toHaveBeenCalled();
      });

      it('and document.nativeDocument has method exitFullscreen, should call it', () => {
        documentMock.nativeDocument.exitFullscreen = () => { return; };
        spyOn(documentMock.nativeDocument, 'exitFullscreen');
        comp.toggleFullScreen();
        expect(documentMock.nativeDocument.exitFullscreen).toHaveBeenCalled();
      });

      it('and document.nativeDocument has method mozCancelFullScreen, should call it', () => {
        documentMock.nativeDocument.mozCancelFullScreen = () => { return; };
        spyOn(documentMock.nativeDocument, 'mozCancelFullScreen');
        comp.toggleFullScreen();
        expect(documentMock.nativeDocument.mozCancelFullScreen).toHaveBeenCalled();
      });

      it('and document.nativeDocument has method msExitFullscreen, should call it', () => {
        documentMock.nativeDocument.msExitFullscreen = () => { return; };
        spyOn(documentMock.nativeDocument, 'msExitFullscreen');
        comp.toggleFullScreen();
        expect(documentMock.nativeDocument.msExitFullscreen).toHaveBeenCalled();
      });

      describe('and videoElement.nativeElement hasn`t fullScreen methods', () => {
        it('should return null', () => {
          expect(comp.toggleFullScreen()).toBeUndefined();
        });
      });
    });
  });
});
