import { Component, Input } from '@angular/core';

import { Video } from '../entities/video';
import { VideoService } from '../services/video.service';

@Component({
  moduleId: module.id,
  selector: 'as-videos',
  templateUrl: 'videos.component.html'
})

export class VideosComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;

  constructor(
    private videoService: VideoService
  ) { }

  selectVideo(index: number): void {
    this.videoService.changePlayedVideo(index);
  }
}
