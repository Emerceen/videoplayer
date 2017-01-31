import { VideoMockService } from '../mock/video-mock.service';


export class MockCommunication {
  constructor(
    public videoService: VideoMockService
  ) {}
}
