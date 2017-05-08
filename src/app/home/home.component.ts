import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';
import { Communication } from '../data-services/communication';
import { VideoService } from '../services/video.service';

@Component({
  moduleId: module.id,
  selector: 'as-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public currentVideo: Video;
  public videos: Array<Video>;

  constructor(
    private cm: Communication,
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.getVideoUrls();
    this.getCurrentVideoIndex();
  }

  getVideoUrls(): void {
    this.cm.videoDataService.getVideoUrls().subscribe(
      res => {
        this.videos = res.videos;
        this.setCurrentVideo();
      },
      () => {
        return false;
      }
    );
  }

  setCurrentVideo(index: number = 0): void {
    this.videos[index].safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.videos[index].url);
    this.currentVideo = this.videos[index];
  }

  getCurrentVideoIndex(): void {
    this.videoService.currentVideoIndexOnChange.subscribe(index => {
      this.setCurrentVideo(index);
    });
  }
}
