import { SafeUrl } from '@angular/platform-browser';

export interface VideoInterface {
  Name: string;
  Url: string;
  Type: string;
  Channel: string;
  Poster: string;
  Views: number;
}

export class Video {
  static fromData(data: VideoInterface): Video {
    return new Video(data.Name, data.Url, data.Type, data.Channel, data.Poster, data.Views);
  }

  constructor(
    public name: string,
    public url: string,
    public type: string,
    public channel: string,
    public poster: string,
    public views: number,
    public playedInShuffle: boolean = false,
    public safeUrl?: SafeUrl
  ) { }
}
