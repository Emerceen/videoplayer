import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http,  XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ChannelDataService } from './channel.service';

import { ChannelMockPascalCase } from './../mock/channel-mock.spec';
import { ConnectionsMock } from '../mock/connections-mock.service.spec';

import { ChannelArray } from './../entities/channel-array';
import { Channel } from './../entities/channel';


describe('Service: ChannelDataService', () => {
  let backend: MockBackend;
  let service: ChannelDataService;
  let http: Http;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ChannelDataService,
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
    service = testbed.get(ChannelDataService);
  }));

  describe('getChannels', () => {

    beforeEach(() => {
      service.url = undefined;
      ConnectionsMock.setup(backend,
        {
          body: new ChannelMockPascalCase(),
          status: 200
        }
      );
    });

    it('should create request and map response array', () => {
      service.getChannels().subscribe(data => {
        expect(data instanceof ChannelArray).toBeTruthy();
        expect(data.channels[0] instanceof Channel).toBeTruthy();
      });
    });
  });
});
