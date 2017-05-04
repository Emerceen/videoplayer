import { Component, Input } from '@angular/core';

import { Video } from '../entities/video';
import { Communication } from '../services/communication';

@Component({
  moduleId: module.id,
  selector: 'as-videos',
  templateUrl: 'videos.component.html'
})

export class VideosComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;

  constructor(
    private cm: Communication
  ) { }

  selectVideo(index: number): void {
    console.log(index);
    this.cm.videoService.changePlayedVideo(index);
  }
}
