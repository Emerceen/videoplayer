import { ChannelDataMockService } from './channel-data-mock.service.spec';
import { VideoDataMockService } from './video-data-mock.service.spec';

export class MockCommunication {
  public videoDataService: VideoDataMockService = new VideoDataMockService();
  public channelDataService: ChannelDataMockService = new ChannelDataMockService();
}
