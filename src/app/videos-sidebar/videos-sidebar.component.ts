import { Component, Input } from '@angular/core';

import { Video } from './../entities/video';

@Component({
  selector: 'app-videos-sidebar',
  templateUrl: 'videos-sidebar.component.html'
})

export class VideosSidebarComponent {
  @Input() public currentVideo: Video;
  @Input() public videos: Array<Video>;
}
