import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideosComponent, VideosModule } from './index';
import { VideoService } from './../services/video.service';

@Component({
  selector: 'as-test',
  template: '<as-videos></as-videos>'
})

class TestComponent {

}

let comp: VideosComponent;
let fixture: ComponentFixture<VideosComponent>;
let videoService: VideoService;

describe('VideosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideosModule],
      providers: [
         VideoService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    comp = fixture.componentInstance;
    videoService = fixture.debugElement.injector.get(VideoService);
  });

  describe('selectVideo', () => {
    beforeEach(() => {
      spyOn(videoService, 'changePlayedVideo');
    });

    it('should call changePlayedVideo', () => {
      comp.selectVideo(1);
      expect(videoService.changePlayedVideo).toHaveBeenCalledWith(1);
    });
  });
});
