import { Injectable } from '@angular/core';

import { VideoDataService } from './video.service';
import { ChannelDataService } from './channel.service';

@Injectable()

export class Communication {
  constructor(
    public videoDataService: VideoDataService,
    public channelDataService: ChannelDataService
  ) {}
}
