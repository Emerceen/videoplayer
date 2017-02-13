import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http,  XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { VideoService } from './video.service';

import { VideoMockPascalCase } from '../mock/video-mock';
import { ConnectionsMock } from '../mock/connections-mock.service';

import { VideoArray } from '../entities/video-array';
import { Video } from '../entities/video';


describe('Service: VideoService', () => {
  let backend: MockBackend;
  let service: VideoService;
  let http: Http;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        VideoService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backendXHR: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendXHR, defaultOptions);
          }
        }
      ]
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    http = testbed.get(Http);
    service = testbed.get(VideoService);

  }));

  describe('getVideoUrls()', () => {

    beforeEach(() => {
      service.url = undefined;
      ConnectionsMock.setup(backend,
        {
          body: new VideoMockPascalCase(),
          status: 200
        }
      );
    });

    it('should create request and map response array', () => {
      service.getVideoUrls().subscribe((data: VideoArray) => {
        expect(data instanceof VideoArray).toBeTruthy();
        expect(data.videos[0] instanceof Video).toBeTruthy();
        expect(data.videos.length).toBe(3);
        expect(data.videos[0].name).toBe('VIDEO 2');
      });
    });
  });
});
