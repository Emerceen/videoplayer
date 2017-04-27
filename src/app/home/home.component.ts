import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';
import { Communication } from '../services/communication';

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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getVideoUrls();
    this.getVideoIndex();
  }

  getVideoUrls(): void {
    this.cm.videoService.getVideoUrls().subscribe(
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

  getVideoIndex(): void {
    this.cm.videoService.videoIndexOnChange.subscribe(index => {
      this.setCurrentVideo(index);
    });
  }
}
