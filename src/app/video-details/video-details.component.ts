import { Component, Input } from '@angular/core';

import { Communication } from '../data-services/communication';
import { Video } from '../entities/video';

@Component({
  selector: 'app-video-details',
  templateUrl: 'video-details.component.html'
})

export class VideoDetailsComponent {
  public video: Video;

  @Input() set currentVideo(video: Video) {
    if (video) {
      this.video = video;
      if (video.channel) {
        this.getChannelDetails(video.channel.id);
      }
    }
  }

  constructor(private cm: Communication) { }

  getChannelDetails(id: string): void {
    this.cm.channelDataService.getChannelById(id).subscribe(channel => {
      this.video.channel = channel;
    });
  }
}
