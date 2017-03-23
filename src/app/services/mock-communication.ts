import { VideoMockService } from '../mock/video-mock.service';


export class MockCommunication {
  public videoService: VideoMockService = new VideoMockService();
}
