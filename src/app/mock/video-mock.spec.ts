import { Video, VideoInterface } from '../entities/video';

export class VideoMock {
  public videos: Array<Video> = [
    {
      name: 'VIDEO 1',
      url: 'http://testwebapplication.cba.pl/674127941.mp4',
      type: 'video/mp4',
      channel: {
        name: 'channel 1',
        id: 'id 1',
        avatarUrl: undefined
      },
      views: 100,
      poster: 'poster',
      playedInShuffle: false
    },
    {
      name: 'VIDEO 2',
      url: 'http://testwebapplication.cba.pl/675076297.mp4',
      type: 'video/mp4',
      channel: {
        name: 'channel 2',
        id: 'id 2',
        avatarUrl: undefined
      },
      views: 100,
      poster: 'poster',
      playedInShuffle: false
    },
    {
      name: 'VIDEO 3',
      url: 'http://testwebapplication.cba.pl/675076800.mp4',
      type: 'video/mp4',
      channel: {
        name: 'channel 3',
        id: 'id 3',
        avatarUrl: undefined
      },
      views: 100,
      poster: 'poster',
      playedInShuffle: false
    },
    {
      name: 'VIDEO 4',
      url: 'http://testwebapplication.cba.pl/675077654.mp4',
      type: 'video/mp4',
      channel: {
        name: 'channel 4',
        id: 'id 4',
        avatarUrl: undefined
      },
      views: 100,
      poster: 'poster',
      playedInShuffle: false
    }
  ];
}

export class VideoMockPascalCase {
  public Videos: Array<VideoInterface> = [
    {
      Name: 'VIDEO 2',
      Url: 'http://testwebapplication.cba.pl/675076297.mp4',
      Channel: {
        Name: 'channel 2',
        Id: 'id 2',
        AvatarUrl: undefined
      },
      Views: 100,
      Poster: 'poster',
      Type: 'video/mp4'
    },
    {
      Name: 'VIDEO 3',
      Url: 'http://testwebapplication.cba.pl/675076800.mp4',
      Channel: {
        Name: 'channel 3',
        Id: 'id 3',
        AvatarUrl: undefined
      },
      Views: 100,
      Poster: 'poster',
      Type: 'video/mp4'
    },
    {
      Name: 'VIDEO 4',
      Url: 'http://testwebapplication.cba.pl/675077654.mp4',
      Channel: {
        Name: 'channel 4',
        Id: 'id 4',
        AvatarUrl: undefined
      },
      Views: 100,
      Poster: 'poster',
      Type: 'video/mp4'
    }
  ];
}
