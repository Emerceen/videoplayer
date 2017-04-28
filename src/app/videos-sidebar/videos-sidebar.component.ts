import { Component, Input } from '@angular/core';

import { Video } from './../entities/video';

@Component({
  moduleId: module.id,
  selector: 'as-videos-sidebar',
  templateUrl: 'videos-sidebar.component.html'
})

export class VideosSidebarComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;
}
