import { Injectable } from '@angular/core';
import { VideoDataService } from './video.service';

@Injectable()


export class Communication {
  constructor(
    public videoDataService: VideoDataService
  ) {}
}
