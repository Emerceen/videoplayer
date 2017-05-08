import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { MousePosition } from './../entities/mouse-position';
import { VideoControls } from './../entities/video-controls';

import { BufferingStateService } from './../services/buffering-state.service';

@Component({
  moduleId: module.id,
  selector: 'as-player-progress-bar',
  templateUrl: 'player-progress-bar.component.html'
})

export class PlayerProgressBarComponent {
  public bufferLoadTime: number = 0.5;
  public bufferRestartTime: number = 2;
  public bufferingVideo: boolean;
  public percentageCurrentTime: number = 0;
  public percentageBufferedVideo: number = 0;
  public mousePosition: MousePosition = {
    x: 0
  };
  @Input() public videoControls: VideoControls;
  @Input() public set videoElement(element: { nativeElement: HTMLVideoElement }) {
    this._videoElement = element;
    this.registerTimeUpdate();
    this.registerProgress();
  };

  public get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };
  @ViewChild('progressBarWrapper') progressBarWrapper: ElementRef;

  private _videoElement: { nativeElement: HTMLVideoElement };

  constructor(
    private bufferingStateService: BufferingStateService
  ) { }

  registerTimeUpdate(): void {
    this._videoElement.nativeElement.ontimeupdate = () => {
      this.getPercentageCurrentTime(this._videoElement.nativeElement.duration, this._videoElement.nativeElement.currentTime);
    };
  }

  registerProgress(): void {
    this._videoElement.nativeElement.onprogress = () => {
      if (this._videoElement.nativeElement.buffered.length > 0) {
        this.getPercentageBufferedVideo(this._videoElement.nativeElement.duration, this._videoElement.nativeElement.buffered.end(0));
        this.checkBufferedLength(
          this._videoElement.nativeElement.duration,
          this._videoElement.nativeElement.currentTime,
          this._videoElement.nativeElement.buffered.end(0)
        );
      }
    };
  }

  getPercentageCurrentTime(duration: number, currentTime: number): void {
    if (duration <= 0) {
      this.percentageCurrentTime = 0;
      return;
    }
    this.percentageCurrentTime = (100 / duration) * currentTime;
  }

  getPercentageBufferedVideo(duration: number, bufferedEnd: number): void {
    this.percentageBufferedVideo = (100 / duration) * bufferedEnd;
  }

  checkBufferedLength(duration: number, currentTime: number, bufferedEnd: number): void {
    let buffLenCurTimeDiference = bufferedEnd - currentTime;
    if (!this.videoControls.stopped && buffLenCurTimeDiference < this.bufferLoadTime && currentTime > 0) {
      this.bufferVideo();
    } else if (this.bufferingVideo && buffLenCurTimeDiference > this.bufferRestartTime || bufferedEnd === duration) {
      this.stopBufferVideo();
    }
    this.bufferingStateService.publish(this.bufferingVideo);
  }

  bufferVideo(): void {
    this.bufferingVideo = true;
    if (this._videoElement.nativeElement.played) {
      this._videoElement.nativeElement.pause();
    }
  }

  stopBufferVideo(): void {
    this.bufferingVideo = false;
    if (this.videoControls.played) {
      this._videoElement.nativeElement.play();
    }
  }

  changeVideoTimeStamp(event: any): void {
    let videoDuration: number = this._videoElement.nativeElement.duration;
    let progressBarWidth: number = this.progressBarWrapper.nativeElement.clientWidth;
    let clickedPxOnProgressBar = event.offsetX;
    this._videoElement.nativeElement.currentTime = this.calculateClickedPlace(videoDuration, progressBarWidth, clickedPxOnProgressBar);
  }

  calculateClickedPlace(videoDuration: number, progressBarWidth: number, clickedPxOnProgressBar: number): number {
    let percentageStamp = (100 / progressBarWidth) * clickedPxOnProgressBar;
    let timeStamp = videoDuration * (percentageStamp / 100);
    return timeStamp;
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

  resetProgressBar(): void {
    this.percentageCurrentTime = 0;
  }
}
