import { Video } from '../entities/video';


export class VideoMock {
  public videos: Array<Video> = [
    {
      name: 'VIDEO 1',
      url: 'http://testwebapplication.cba.pl/674127941.mp4',
      type: 'video/mp4'
    },
    {
      name: 'VIDEO 2',
      url: 'http://testwebapplication.cba.pl/675076297.mp4',
      type: 'video/mp4'
    },
    {
      name: 'VIDEO 3',
      url: 'http://testwebapplication.cba.pl/675076800.mp4',
      type: 'video/mp4'
    },
    {
      name: 'VIDEO 4',
      url: 'http://testwebapplication.cba.pl/675077654.mp4',
      type: 'video/mp4'
    }
  ];
}

export class VideoMockPascalCase {
  public Videos = [
    {
      Name: 'VIDEO 2',
      Url: 'http://testwebapplication.cba.pl/675076297.mp4',
      Type: 'video/mp4'
    },
    {
      Name: 'VIDEO 3',
      Url: 'http://testwebapplication.cba.pl/675076800.mp4',
      Type: 'video/mp4'
    },
    {
      Name: 'VIDEO 4',
      Url: 'http://testwebapplication.cba.pl/675077654.mp4',
      Type: 'video/mp4'
    }
  ];
}
