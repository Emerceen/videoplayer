import { Component, OnInit, ViewChild } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';

import { Communication } from '../services/communication';

@Component({
  moduleId: module.id,
  selector: 'as-player',
  templateUrl: 'player.component.html'
})

export class PlayerComponent implements OnInit {
  @ViewChild('mainVideo') videoElement: any;
  public currentVideo: Video;
  public videos: Array<Video>;
  public isStopped: boolean = true;
  public isPlaying: boolean = false;

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
      this.videoElement.nativeElement.load();
      this.videoElement.nativeElement.play();
    } else {
      this.videoElement.nativeElement.load();
      this.stopVideo();

    }
  }

  playVideo() {
    this.isStopped = false;
    this.isPlaying = true;
    this.videoElement.nativeElement.play();
  }

  pauseVideo() {
    this.isStopped = false;
    this.isPlaying = false;
    this.videoElement.nativeElement.pause();
  }

  stopVideo() {
    this.setCurrentVideo();
    this.videoElement.nativeElement.load();
    this.isStopped = true;
    this.isPlaying = false;
  }
}
