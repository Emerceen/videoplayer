import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideoDetailsComponent, VideoDetailsModule } from './index';

@Component({
  selector: 'as-test',
  template: '<as-video-details></as-video-details>'
})

class TestComponent {

}

let comp: VideoDetailsComponent;
let fixture: ComponentFixture<VideoDetailsComponent>;

describe('VideoDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideoDetailsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsComponent);
    comp = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
