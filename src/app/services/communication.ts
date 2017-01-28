import { Injectable } from '@angular/core';
import { VideoService } from './video.service';

@Injectable()


export class Communication {
  constructor(
    public videoService: VideoService
  ) {}
}
