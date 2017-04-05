import { SafeUrl } from '@angular/platform-browser';

export interface VideoInterface {
  Name: string;
  Url: string;
  Type: string;
}

export class Video {
  static fromData(data: VideoInterface): Video {
    return new Video(data.Name, data.Url, data.Type);
  }

  constructor(
    public name: string,
    public url: string,
    public type: string,
    public playedInShuffle: boolean = false,
    public safeUrl?: SafeUrl
  ) { }
}
