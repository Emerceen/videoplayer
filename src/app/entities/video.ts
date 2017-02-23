import { SafeUrl } from '@angular/platform-browser';
import { VideoControls } from './video-controls';


export interface VideoInterface {
  Name: string;
  Url: string;
  Type: string;
}

export class Video {
  static fromData(data: VideoInterface) {
    return new Video(data.Name, data.Url, data.Type, new VideoControls());
  }

  constructor(
    public name: string,
    public url: string,
    public type: string,
    public controls: VideoControls,
    public safeUrl?: SafeUrl
  ) { }
}
