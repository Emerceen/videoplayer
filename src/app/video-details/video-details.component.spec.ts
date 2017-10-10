import { Video } from './../entities/video';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { VideoDetailsComponent, VideoDetailsModule } from './index';
import { MockCommunication } from '../mock/communication-mock';
import { Communication } from '../data-services/communication';

@Component({
  selector: 'app-test',
  template: '<app-video-details></app-video-details>'
})

class TestComponent {

}

let comp: VideoDetailsComponent;
let fixture: ComponentFixture<VideoDetailsComponent>;
let communication: any;

describe('VideoDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        VideoDetailsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [
        { provide: Communication, useClass: MockCommunication }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsComponent);

    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
  });

  describe('setter curentVideo', () => {
    beforeEach(() => {
      spyOn(comp, 'getChannelDetails');
    });

    it('when video has property channel, should set video, and video.channel', () => {
      comp.currentVideo = communication.videoDataService.videoUrlsMock.videos[0];
      expect(comp.video).toBe(communication.videoDataService.videoUrlsMock.videos[0]);
      expect(comp.getChannelDetails).toHaveBeenCalled();
    });

    it('when video is defined, should set video', () => {
      const data = new Video('test', 'test', 'test', undefined, 'test', 123);
      comp.currentVideo = data;
      expect(comp.video).toBe(data);
      expect(comp.getChannelDetails).toHaveBeenCalledTimes(0);
    });
  });
});
