import { VideoArray, VideoArrayInterface } from './video-array';
import { Video } from './video';

let data: VideoArrayInterface = {
  Videos: [
    {
      Name: 'test name',
      Url: 'test url',
      Type: 'test type'
    }
  ]
};

describe('VideoArray', () => {
  it('should create VideoArray instance from data of type VideoArrayInterface and create Video instance of type VideoInterface', () => {
    expect(VideoArray.fromData(data) instanceof VideoArray).toBe(true);
    expect(VideoArray.fromData(data).videos[0] instanceof Video).toBe(true);
  });
});
