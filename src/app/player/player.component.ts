import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';
import { HoverInterface } from './../entities/hover';
import { Communication } from '../services/communication';
import { DocumentMozMsPrefixesRefService } from '../services/document.service';

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

  @ViewChild('videoWrapper') videoWrapper: ElementRef;

  get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };

  public currentVideo: Video;
  public controls: HoverInterface = {
    isHover: false
  };
  public videos: Array<Video>;
  public posterUrl: string = 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
  public playerSettings: boolean = false;
  public isRepeatedPlaylist: boolean = false;
  public isFullScreen: boolean = false;

  private _videoElement: { nativeElement: HTMLVideoElement };

  constructor(
    private _cm: Communication,
    private _sanitizer: DomSanitizer,
    private _document: DocumentMozMsPrefixesRefService
  ) { }

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

  setCurrentVideo(index: number = 0): void {
    this.videos[index].safeUrl = this._sanitizer.bypassSecurityTrustUrl(this.videos[index].url);
    this.currentVideo = this.videos[index];
  }

  endedEventHandler(index: number = this.videos.indexOf(this.currentVideo) + 1): void {
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

  endedRepeatedPlaylistEventHandler(): void {
    let index = this.videos.indexOf(this.currentVideo) + 1;
    if (index < this.videos.length) {
      this.setCurrentVideo(index);
    } else {
      this.setCurrentVideo();
    }
    this._videoElement.nativeElement.load();
    this.playVideo();
  }

  playVideo(): void {
    this.currentVideo.controls.stopped = false;
    this.currentVideo.controls.played = true;
    this._videoElement.nativeElement.play();
    this._videoElement.nativeElement.poster = '';
  }

  pauseVideo(): void {
    this.currentVideo.controls.stopped = false;
    this.currentVideo.controls.played = false;
    this._videoElement.nativeElement.pause();
  }

  stopVideo(): void {
    this._videoElement.nativeElement.poster = this.posterUrl;
    this.setCurrentVideo();
    this._videoElement.nativeElement.load();
    this.currentVideo.controls.stopped = true;
    this.currentVideo.controls.played = false;
  }

  repeatCurrentVideo(): void {
    if (!this.currentVideo.controls.repeated) {
      this._videoElement.nativeElement.onended = () => this.endedRepeatedCurrentVideoEventHandler();
    } else {
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
    }
    this.currentVideo.controls.repeated = !this.currentVideo.controls.repeated;
  }

  repeatPlaylist(isShufflePlaying: boolean): void {
    this.isRepeatedPlaylist = !this.isRepeatedPlaylist;
    if (isShufflePlaying) {
      return;
    }
    if (this.isRepeatedPlaylist) {
      this._videoElement.nativeElement.onended = () => this.endedRepeatedPlaylistEventHandler();
    } else {
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
    }
  }

  shufflePlay(isEnable?: boolean): void {
    let randomNumber: number;
    let shuffleVideoArray: Array<Video>;
    if (isEnable) {
      if (!this.currentVideo.controls.played) {
        this.initialRandomVideo();
      }
      this._videoElement.nativeElement.onended = () => {
        this.currentVideo.controls.playedInShuffle = true;
        shuffleVideoArray = this.videos.filter(video => !video.controls.playedInShuffle);
        if (shuffleVideoArray.length > 0) {
          randomNumber = Math.floor(Math.random() * shuffleVideoArray.length);
          let indexInVideosArray = this.videos.indexOf(shuffleVideoArray[randomNumber]);
          this.videos[indexInVideosArray].controls.playedInShuffle = true;
          this.endedEventHandler(indexInVideosArray);
        } else if (this.isRepeatedPlaylist) {
          this.resetShufflePlaying();
          this.initialRandomVideo();
          this.playVideo();
        } else {
          this.stopVideo();
          this.resetShufflePlaying();
          this.initialRandomVideo();
        }
      };
    } else {
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
      this.resetShufflePlaying();
    }
  }

  initialRandomVideo(): void {
    let randomNumber = Math.floor(Math.random() * this.videos.length);
    this.setCurrentVideo(randomNumber);
    this._videoElement.nativeElement.load();
    this.currentVideo.controls.stopped = true;
    this.currentVideo.controls.played = false;
  }

  resetShufflePlaying(): void {
    this.videos.map(video => {
      video.controls.playedInShuffle = false;
    });
  }

  changeStatePlayerSettings(): void {
    this.playerSettings = !this.playerSettings;
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      if (this.videoWrapper.nativeElement.webkitRequestFullScreen) {
        this.videoWrapper.nativeElement.webkitRequestFullScreen();
      } else if (this.videoWrapper.nativeElement.requestFullScreen) {
        this.videoWrapper.nativeElement.requestFullScreen();
      } else if (this.videoWrapper.nativeElement.mozRequestFullScreen) {
        this.videoWrapper.nativeElement.mozRequestFullScreen();
      } else if (this.videoWrapper.nativeElement.msRequestFullscreen) {
        this.videoWrapper.nativeElement.msRequestFullscreen();
      } else {
        return;
      }
    } else {
      if (this._document.nativeDocument.webkitExitFullscreen) {
        this._document.nativeDocument.webkitExitFullscreen();
      } else if (this._document.nativeDocument.exitFullscreen) {
        this._document.nativeDocument.exitFullscreen();
      } else if (this._document.nativeDocument.mozCancelFullScreen) {
        this._document.nativeDocument.mozCancelFullScreen();
      } else if (this._document.nativeDocument.msExitFullscreen) {
        this._document.nativeDocument.msExitFullscreen();
      } else {
        return;
      }
    }
    this.isFullScreen = !this.isFullScreen;
  }
}
