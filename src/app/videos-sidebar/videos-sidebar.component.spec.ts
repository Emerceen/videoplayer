import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { VideoService } from './../services/video.service';

import { VideosSidebarComponent, VideosSidebarModule } from './index';

@Component({
  selector: 'as-test',
  template: '<as-videos-sidebar></as-videos-sidebar>'
})

class TestComponent {

}

let comp: VideosSidebarComponent;
let fixture: ComponentFixture<VideosSidebarComponent>;

describe('VideosSidebarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideosSidebarModule],
      providers: [
        VideoService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosSidebarComponent);
    comp = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
