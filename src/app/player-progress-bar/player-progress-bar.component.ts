import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'as-player-progress-bar',
  templateUrl: 'player-progress-bar.component.html'
})

export class PlayerProgressBarComponent {
  public percentageCurrentTime: number = 0;
  @Input() public set videoElement(element: { nativeElement: HTMLVideoElement }) {
    this._videoElement = element;
    this.registerTimeUpdate();
  };

  public get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };

  private _videoElement: { nativeElement: HTMLVideoElement };

  registerTimeUpdate(): void {
    this.videoElement.nativeElement.ontimeupdate = () => {
      this.getPercentageCurrentTime(this.videoElement.nativeElement.duration, this.videoElement.nativeElement.currentTime);
    };
  }

  getPercentageCurrentTime(duration: number, currentTime: number): void {
    this.percentageCurrentTime = Math.floor((100 / duration) * currentTime);
  }
}
