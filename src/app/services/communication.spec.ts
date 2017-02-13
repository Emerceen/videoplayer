import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';

import { VideoService } from './video.service';
import { Communication } from './communication';

// import { VideoMockPascalCase } from '../mock/video-mock';
// import { ConnectionsMock } from '../mock/connections-mock.service';

// import { VideoArray } from '../entities/video-array';
// import { Video } from '../entities/video';


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
          provide: VideoService,
          useFactory: (Http) => {
            return new VideoService(Http);
          },
          deps: [Http],
        }
      ]
    });

    const testbed = getTestBed();
    communication = testbed.get(Communication);

  }));

  describe('Communication', () => {
    it('should create request and map response array', () => {
      expect(communication instanceof Communication).toBeTruthy();
      expect(communication.videoService instanceof VideoService).toBeTruthy();
    });
  });
});
