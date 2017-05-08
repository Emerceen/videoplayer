import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';

import { TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate';

import { HomeComponent, HomeModule } from './index';
import { Communication } from '../data-services/communication';
import { VideoService } from '../services/video.service';
import { MockCommunication } from '../mock/communication-mock';

@Component({
  selector: 'as-test',
  template: '<as-home></as-home>'
})

class TestComponent {

}

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let videoService: VideoService;
let communication: any;

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        HomeModule
      ],
      providers: [
        { provide: Communication, useClass: MockCommunication },
        VideoService,
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
    videoService = fixture.debugElement.injector.get(VideoService);
    expect(comp).toBeDefined();
  });

  it('ngOnInit should call getBufferingState,', () => {
    spyOn(comp, 'getVideoUrls');
    spyOn(comp, 'getCurrentVideoIndex');
    comp.ngOnInit();
    expect(comp.getVideoUrls).toHaveBeenCalled();
    expect(comp.getCurrentVideoIndex).toHaveBeenCalled();
  });

  describe('getVideoUrls should', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
    });

    afterEach(() => {
      comp.videos = undefined;
      communication.videoDataService.videoUrlsError = false;
    });

    it('get videos and call setCurrentVideo when response is success', () => {
      comp.getVideoUrls();
      expect(comp.videos).toBe(communication.videoDataService.videoUrlsMock.videos);
      expect(comp.setCurrentVideo).toHaveBeenCalled();
    });

    it('return false when response is error', () => {
      communication.videoDataService.videoUrlsError = true;
      expect(comp.getVideoUrls()).toBeFalsy();
    });
  });

  describe('setCurrentVideo should', () => {
    describe('set safeUrl of video object, and define currentVideo of video object', () => {
      beforeEach(() => {
        comp.videos = communication.videoDataService.videoUrlsMock.videos;
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

  describe('getCurrentVideoIndex', () => {
    beforeEach(() => {
      spyOn(comp, 'setCurrentVideo');
    });

    it('should call setCurrentVideo with index', () => {
      let index = 1;
      comp.getCurrentVideoIndex();
      videoService.changeCurrentVideo(index);
      expect(comp.setCurrentVideo).toHaveBeenCalledWith(index);
    });
  });
});
