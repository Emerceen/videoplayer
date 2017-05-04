import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideosSidebarComponent, VideosSidebarModule } from './index';
import { MockCommunication } from './../mock/communication-mock';
import { Communication } from './../services/communication';

@Component({
  selector: 'as-test',
  template: '<as-videos-sidebar></as-videos-sidebar>'
})

class TestComponent {

}

let comp: VideosSidebarComponent;
let fixture: ComponentFixture<VideosSidebarComponent>;
let communication: any;

describe('VideosSidebarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideosSidebarModule],
      providers: [
         { provide: Communication, useClass: MockCommunication }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosSidebarComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
