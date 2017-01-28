import { Video, VideoInterface } from './video';

export interface VideoArrayInterface {
  Videos: Array<VideoInterface>;
}

export class VideoArray {
  static fromData(data: VideoArrayInterface) {
    return new VideoArray(
      data.Videos.map(video => Video.fromData(video))
    );
  }

  constructor(
    public videos: Array<Video>
  ) { }
}
