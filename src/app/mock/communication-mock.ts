import { VideoDataMockService } from './video-data-mock.service.spec';

export class MockCommunication {
  public videoDataService: VideoDataMockService = new VideoDataMockService();
}
