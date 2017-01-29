import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';

import { Communication } from '../services/communication';

@Component({
  moduleId: module.id,
  selector: 'as-player',
  templateUrl: 'player.component.html'
})

export class PlayerComponent implements OnInit {
  public currentVideo: Video;
  public videos: Array<Video>;

  constructor(
    private _cm: Communication,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getVideoUrls();
  }

  getVideoUrls(): void {
    this._cm.videoService.getVideoUrls().subscribe(
      res => {
        this.videos = res.videos;
        this.setCurrentVideo();
      }
    );
  }

  setCurrentVideo(index = 0): void {
    this.videos[index].safeUrl = this._sanitizer.bypassSecurityTrustUrl(this.videos[index].url);
    this.currentVideo = this.videos[index];
  }

  endedEventHandler(event: any): void {
    let index = this.videos.indexOf(this.currentVideo) + 1;
    event.preventDefault();
    if (index < this.videos.length) {
      this.setCurrentVideo(index);
      event.path[0].load();
      event.path[0].play();
    } else {
      this.setCurrentVideo();
      event.path[0].load();
    }
  }
}
