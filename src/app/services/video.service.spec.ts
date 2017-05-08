import { async, getTestBed, TestBed } from '@angular/core/testing';

import { VideoService } from './video.service';


describe('Service: VideoService', () => {
  let service: VideoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VideoService
      ]
    });

    const testbed = getTestBed();
    service = testbed.get(VideoService);

  }));

  describe('changeCurrentVideo()', () => {
    beforeEach(() => {
      spyOn(service.currentVideoIndex, 'next');
    });

    it('should call currentVideoIndex.next() with index', () => {
      let index = 1;
      service.changeCurrentVideo(index);
      expect(service.currentVideoIndex.next).toHaveBeenCalledWith(index);
    });

    it('should call currentVideoIndex.next() with 0 when parameter was not passsed', () => {
      service.changeCurrentVideo();
      expect(service.currentVideoIndex.next).toHaveBeenCalledWith(0);
    });
  });

  describe('changePlayedVideo()', () => {
    beforeEach(() => {
      spyOn(service.playedVideoIndex, 'next');
    });

    it('should call playedVideoIndex.next() with index', () => {
      let index = 1;
      service.changePlayedVideo(index);
      expect(service.playedVideoIndex.next).toHaveBeenCalledWith(index);
    });
  });
});
