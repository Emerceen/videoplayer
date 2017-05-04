import { Component, Input } from '@angular/core';

import { Video } from '../entities/video';
import { Communication } from '../services/communication';

@Component({
  moduleId: module.id,
  selector: 'as-video',
  templateUrl: 'video.component.html'
})

export class VideoComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;

  constructor(
    private cm: Communication
  ) { }

  selectVideo(index: number): void {
    console.log(index);
    this.cm.videoService.changeCurrentVideo(index);
  }
}