import { SafeUrl } from '@angular/platform-browser';

import { ChannelInterface, Channel } from './channel';

export interface VideoInterface {
  Name: string;
  Url: string;
  Type: string;
  Channel: ChannelInterface;
  Poster: string;
  Views: number;
}

export class Video {
  static fromData(data: VideoInterface): Video {
    return new Video(data.Name, data.Url, data.Type, Channel.fromData(data.Channel), data.Poster, data.Views);
  }

  constructor(
    public name: string,
    public url: string,
    public type: string,
    public channel: Channel,
    public poster: string,
    public views: number,
    public playedInShuffle: boolean = false,
    public safeUrl?: SafeUrl
  ) { }
}
