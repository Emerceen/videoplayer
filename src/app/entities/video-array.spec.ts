import { VideoArray, VideoArrayInterface } from './video-array';
import { Video } from './video';

let data: VideoArrayInterface = {
  Videos: [
    {
      Name: 'test name',
      Url: 'test url',
      Type: 'test type',
      Channel: 'xyz',
      Poster: 'poster',
      Views: 100
    }
  ]
};

describe('VideoArray', () => {
  it('should create VideoArray instance from data of type VideoArrayInterface and create Video instance of type VideoInterface', () => {
    expect(VideoArray.fromData(data) instanceof VideoArray).toBe(true);
    expect(VideoArray.fromData(data).videos[0] instanceof Video).toBe(true);
  });

  it('should create Video instance with constructor and playedInShuffle value', () => {
    expect(new Video('test', 'url', 'type', 'xyz', 'poster', 100, true) instanceof Video).toBe(true);
  });
});
