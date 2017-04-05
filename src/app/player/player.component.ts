import { VideoControls } from './../entities/video-controls';
import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Video } from '../entities/video';
import { HoverInterface } from './../entities/hover';
import { Communication } from '../services/communication';
import { PlayerControlsComponent } from '../player-controls/index';

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
      this.cdr.detectChanges();
    }
  };
  @ViewChild('videoWrapper') set videoWrapperElement(element: ElementRef) {
    if (element && element.nativeElement) {
      this._videoWrapperElement = element;
      this.cdr.detectChanges();
    }
  };
  @ViewChild('playerSettingsComponent') playerSettingsComponent: ElementRef;
  @ViewChild(PlayerControlsComponent) playerControlsComponent: PlayerControlsComponent;

  get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };

  get videoWrapperElement(): ElementRef {
    return this._videoWrapperElement;
  };

  public currentVideo: Video;
  public controls: HoverInterface = {
    isHover: false,
  };
  public videoControls: VideoControls = new VideoControls();

  public isFullScreen: boolean = false;
  public videos: Array<Video>;
  public posterUrl: string = 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
  public playerSettings: boolean = false;
  public isRepeatedPlaylist: boolean = false;

  private _videoElement: { nativeElement: HTMLVideoElement };
  private _videoWrapperElement: ElementRef;

  @HostListener('document:click', ['$event'])
    clickout(event: any): void {
      let disableString = 'document-click-disable';
      if (!this.playerSettingsComponent.nativeElement.contains(event.target) && !event.target.className.includes(disableString)) {
        this.playerSettings = false;
      }
    }

  constructor(
    private _cm: Communication,
    private _sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
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
      this.callPlayVideo();
    } else {
      this._videoElement.nativeElement.load();
      this.callStopVideo();
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
    this.callPlayVideo();
  }

  repeatCurrentVideo(): void {
    if (!this.videoControls.repeated) {
      this._videoElement.nativeElement.onended = () => this.endedRepeatedCurrentVideoEventHandler();
    } else {
      this._videoElement.nativeElement.onended = () => this.endedEventHandler();
    }
    this.videoControls.repeated = !this.videoControls.repeated;
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
      if (!this.videoControls.played) {
        this.initialRandomVideo();
      }
      this._videoElement.nativeElement.onended = () => {
        this.videoControls.playedInShuffle = true;
        shuffleVideoArray = this.videos.filter(video => !video.playedInShuffle);
        if (shuffleVideoArray.length > 0) {
          randomNumber = Math.floor(Math.random() * shuffleVideoArray.length);
          let indexInVideosArray = this.videos.indexOf(shuffleVideoArray[randomNumber]);
          this.videos[indexInVideosArray].playedInShuffle = true;
          this.endedEventHandler(indexInVideosArray);
        } else if (this.isRepeatedPlaylist) {
          this.resetShufflePlaying();
          this.initialRandomVideo();
          this.callPlayVideo();
        } else {
          this.callStopVideo();
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
    this.videoControls.stopped = true;
    this.videoControls.played = false;
  }

  resetShufflePlaying(): void {
    this.videos.map(video => {
      video.playedInShuffle = false;
    });
  }

  callPlayVideo(): void {
    this.playerControlsComponent.playVideo();
  }

  callStopVideo(): void {
    this.playerControlsComponent.stopVideo();
  }
}
