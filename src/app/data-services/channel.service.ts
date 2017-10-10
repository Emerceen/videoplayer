import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { apiUrl } from '../commons/api-url';

import { ChannelArray } from '../entities/channel-array';
import { Channel } from '../entities/channel';

@Injectable()

export class ChannelDataService {
  public url: string;

  constructor(
    private http: Http
  ) {}

  getChannels(): Observable<ChannelArray> {
    const reqUrl = 'channels-mock.json';
    this.url = apiUrl(reqUrl);

    return this.http.get(this.url)
      .map(response => ChannelArray.fromData(response.json()));
  }

  getChannelById(id: string): Observable<Channel> {
    const reqUrl = `channel${id}.json`;
    this.url = apiUrl(reqUrl);

    return this.http.get(this.url)
      .map(response => Channel.fromData(response.json()));
  }
}
