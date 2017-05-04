import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { VideosComponent, VideosModule } from './index';
import { MockCommunication } from './../mock/communication-mock';
import { Communication } from './../services/communication';

@Component({
  selector: 'as-test',
  template: '<as-videos></as-videos>'
})

class TestComponent {

}

let comp: VideosComponent;
let fixture: ComponentFixture<VideosComponent>;
let communication: any;

describe('VideosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [VideosModule],
      providers: [
         { provide: Communication, useClass: MockCommunication }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    comp = fixture.componentInstance;
    communication = fixture.debugElement.injector.get(Communication);
  });

  describe('selectVideo', () => {
    beforeEach(() => {
      spyOn(communication.videoService, 'changePlayedVideo');
    });

    it('should call changePlayedVideo', () => {
      comp.selectVideo(1);
      expect(communication.videoService.changePlayedVideo).toHaveBeenCalledWith(1);
    });
  });
});
