import { Component, Input } from '@angular/core';

import { Video } from './../entities/video';

@Component({
  moduleId: module.id,
  selector: 'as-video-details',
  templateUrl: 'video-details.component.html'
})

export class VideoDetailsComponent {
  @Input() currentVideo: Video;
}
