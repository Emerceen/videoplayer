import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'as-player-progress-bar',
  templateUrl: 'player-progress-bar.component.html'
})

export class PlayerProgressBarComponent {
  public duration: number = 0;
  @Input() public set videoElement(element: { nativeElement: HTMLVideoElement }) {
    if (element.nativeElement) {
      this._videoElement = element;
      this.registerTimeUpdate();
    }
  };

  public get videoElement(): { nativeElement: HTMLVideoElement } {
    return this._videoElement;
  };

  private _videoElement: { nativeElement: HTMLVideoElement };

  registerTimeUpdate(): void {
    this.videoElement.nativeElement.ontimeupdate = () => { this.timeLog(); };
  }

  timeLog(): void {
    this.duration = Math.floor((100 / this.videoElement.nativeElement.duration) * this.videoElement.nativeElement.currentTime);
  }
}
