import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';

import { VideoDataService } from './video.service';
import { Communication } from './communication';

describe('Communication', () => {
  let communication: Communication;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        Communication,
        {
          provide: VideoDataService,
          useFactory: (Http) => {
            return new VideoDataService(Http);
          },
          deps: [Http]
        }
      ]
    });

    const testbed = getTestBed();
    communication = testbed.get(Communication);

  }));

  describe('Communication', () => {
    it('should create request and map response array', () => {
      expect(communication instanceof Communication).toBeTruthy();
      expect(communication.videoDataService instanceof VideoDataService).toBeTruthy();
    });
  });
});
