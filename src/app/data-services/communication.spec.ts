import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';

import { VideoDataService } from './video.service';
import { ChannelDataService } from './channel.service';
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
          useFactory: (http) => {
            return new VideoDataService(http);
          },
          deps: [Http]
        },
        {
          provide: ChannelDataService,
          useFactory: (http) => {
            return new ChannelDataService(http);
          },
          deps: [Http]
        }
      ]
    });

    const testbed = getTestBed();
    communication = testbed.get(Communication);

  }));

  it('should create request and map response array', () => {
    expect(communication instanceof Communication).toBeTruthy();
    expect(communication.videoDataService instanceof VideoDataService).toBeTruthy();
    expect(communication.channelDataService instanceof ChannelDataService).toBeTruthy();
  });
});
