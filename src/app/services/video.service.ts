import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { apiUrl } from '../commons/api-url';

import { VideoArray } from '../entities/video-array';

@Injectable()

export class VideoService {
  public url: string;

  constructor(
    private _http: Http
  ) {}

  getVideoUrls(): Observable<VideoArray> {
    let reqUrl = 'videos-mock.json';
    this.url = apiUrl(reqUrl);

    return this._http.get(this.url)
      .map(response => VideoArray.fromData(response.json()));
  }
}
