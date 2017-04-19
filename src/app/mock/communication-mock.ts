import { VideoMockService } from './video-mock.service.spec';

export class MockCommunication {
  public videoService: VideoMockService = new VideoMockService();
}
