import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideoComponent, VideoModule } from './index';
import { MockCommunication } from './../mock/communication-mock';
import { Communication } from './../services/communication';

@Component({
  selector: 'as-test',
  template: '<as-video></as-video>'
})

class TestComponent {

}

let comp: VideoComponent;
let fixture: ComponentFixture<VideoComponent>;
let communication: any;

describe('VideoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideoModule],
      providers: [
         { provide: Communication, useClass: MockCommunication }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
