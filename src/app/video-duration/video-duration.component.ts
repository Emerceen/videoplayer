import { TimeString } from './../time-string/time-string.service';
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'as-video-duration',
  templateUrl: 'video-duration.component.html'
})

export class VideoDurationComponent {
  @Input() public set currentTime(value: number) {
    this.currentTimeTimeString = this.timeString.toHHMMSS(value);
  };
  @Input() public set duration(value: number) {
    this.durationTimeString = this.timeString.toHHMMSS(value);
  };

  public durationTimeString: string;
  public currentTimeTimeString: string = '0:00';

  constructor(
    private timeString: TimeString
  ) { }
}
