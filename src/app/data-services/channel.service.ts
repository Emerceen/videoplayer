import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { apiUrl } from '../commons/api-url';

import { ChannelArray } from '../entities/channel-array';

@Injectable()

export class ChannelDataService {
  public url: string;

  constructor(
    private http: Http
  ) {}

  getChannels(): Observable<ChannelArray> {
    let reqUrl = 'channels-mock.json';
    this.url = apiUrl(reqUrl);

    return this.http.get(this.url)
      .map(response => ChannelArray.fromData(response.json()));
  }
}
