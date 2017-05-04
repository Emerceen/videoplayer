import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { apiUrl } from '../commons/api-url';

import { VideoArray } from '../entities/video-array';

@Injectable()

export class VideoService {
  public url: string;
  public currentVideoIndex: Subject<number> = new Subject<number>();
  public playedVideoIndex: Subject<number> = new Subject<number>();
  public currentVideoIndexOnChange: Observable<number> = this.currentVideoIndex.asObservable();
  public playedVideoIndexOnChange: Observable<number> = this.playedVideoIndex.asObservable();

  constructor(
    private http: Http
  ) {}

  changeCurrentVideo(index: number = 0): void {
    this.currentVideoIndex.next(index);
  }

  changePlayedVideo(index: number): void {
    this.playedVideoIndex.next(index);
  }

  getVideoUrls(): Observable<VideoArray> {
    let reqUrl = 'videos-mock.json';
    this.url = apiUrl(reqUrl);

    return this.http.get(this.url)
      .map(response => VideoArray.fromData(response.json()));
  }
}
