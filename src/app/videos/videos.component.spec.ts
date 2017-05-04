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

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
