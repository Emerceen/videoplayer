import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';

import { HomeComponent, HomeModule } from './index';
import { Communication } from '../services/communication';
import { MockCommunication } from '../mock/communication-mock';

@Component({
  selector: 'as-test',
  template: '<as-home></as-home>'
})

class TestComponent {

}

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
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
        { provide: Communication, useClass: MockCommunication }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    communication = fixture.debugElement.injector.get(Communication);
    expect(comp).toBeDefined();
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
