import { Component, Input } from '@angular/core';

import { Video } from './../entities/video';

@Component({
  moduleId: module.id,
  selector: 'as-video',
  templateUrl: 'video.component.html'
})

export class VideoComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;
}
