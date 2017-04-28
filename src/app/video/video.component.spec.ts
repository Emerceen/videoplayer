import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideoComponent, VideoModule } from './index';

@Component({
  selector: 'as-test',
  template: '<as-video></as-video>'
})

class TestComponent {

}

let comp: VideoComponent;
let fixture: ComponentFixture<VideoComponent>;

describe('VideoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideoModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    comp = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
