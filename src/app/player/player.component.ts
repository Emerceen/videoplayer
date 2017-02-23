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
  @ViewChild('mainVideo') set videoElement(element: { nativeElement: HTMLVideoElement }) {
    if (element) {
      this._videoElement = element;
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
    }
  }

  get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };

  public currentVideo: Video;
  public videos: Array<Video>;
  public posterUrl: string = 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';

  private _videoElement: { nativeElement: HTMLVideoElement };

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
      },
      () => {
        return false;
      }
    );
  }

  setCurrentVideo(index = 0): void {
    this.videos[index].safeUrl = this._sanitizer.bypassSecurityTrustUrl(this.videos[index].url);
    this.currentVideo = this.videos[index];
  }

  endedEventHandler(): void {
    let index = this.videos.indexOf(this.currentVideo) + 1;
    if (index < this.videos.length) {
      this.setCurrentVideo(index);
      this._videoElement.nativeElement.load();
      this.playVideo();
    } else {
      this._videoElement.nativeElement.load();
      this.stopVideo();
    }
  }

  endedRepeatedCurrentVideoEventHandler(): void {
    this._videoElement.nativeElement.play();
  }

  playVideo() {
    this.currentVideo.controls.stopped = false;
    this.currentVideo.controls.played = true;
    this._videoElement.nativeElement.play();
    this._videoElement.nativeElement.poster = undefined;
  }

  pauseVideo() {
    this.currentVideo.controls.stopped = false;
    this.currentVideo.controls.played = false;
    this._videoElement.nativeElement.pause();
  }

  stopVideo() {
    this._videoElement.nativeElement.poster = this.posterUrl;
    this.setCurrentVideo();
    this._videoElement.nativeElement.load();
    this.currentVideo.controls.stopped = true;
    this.currentVideo.controls.played = false;
  }

  repeatCurrentVideo() {
    if (!this.currentVideo.controls.repeated) {
      this._videoElement.nativeElement.onended = () => this.endedRepeatedCurrentVideoEventHandler();
    } else {
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
    }
    this.currentVideo.controls.repeated = !this.currentVideo.controls.repeated;
  }
}
