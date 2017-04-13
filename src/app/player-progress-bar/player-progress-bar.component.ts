import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MousePosition } from './../entities/mouse-position';

@Component({
  moduleId: module.id,
  selector: 'as-player-progress-bar',
  templateUrl: 'player-progress-bar.component.html'
})

export class PlayerProgressBarComponent {
  public percentageCurrentTime: number = 0;
  public percentageBufferedVideo: number = 0;
  public mousePosition: MousePosition = {
    x: 0
  };
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

  registerTimeUpdate(): void {
    this._videoElement.nativeElement.ontimeupdate = () => {
      this.getPercentageCurrentTime(this._videoElement.nativeElement.duration, this._videoElement.nativeElement.currentTime);
    };
  }

  registerProgress(): void {
    this._videoElement.nativeElement.onprogress = () => {
      if (this._videoElement.nativeElement.buffered.length > 0) {
        this.getPercentageBufferedVideo(this._videoElement.nativeElement.duration, this._videoElement.nativeElement.buffered.end(0));
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

  getPercentageBufferedVideo(duration: number, bufferedLength: number): void {
    this.percentageBufferedVideo = (100 / duration) * bufferedLength;
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
}
