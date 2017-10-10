import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class VideoService {
  public currentVideoIndex: Subject<number> = new Subject<number>();
  public playedVideoIndex: Subject<number> = new Subject<number>();
  public currentVideoIndexOnChange: Observable<number> = this.currentVideoIndex.asObservable();
  public playedVideoIndexOnChange: Observable<number> = this.playedVideoIndex.asObservable();

  changeCurrentVideo(index: number = 0): void {
    this.currentVideoIndex.next(index);
  }

  changePlayedVideo(index: number): void {
    this.playedVideoIndex.next(index);
  }
}
