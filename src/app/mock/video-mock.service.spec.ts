import { Observable } from 'rxjs/Rx';
import { VideoMock } from './video-mock.spec';

export class VideoMockService  {
  public videoUrlsMock: VideoMock = new VideoMock();
  public videoUrlsError: boolean =  false;
  public getVideoUrls(): Observable<any> {
    let error = `err`;
    return Observable.create(observer => {
      if (this.videoUrlsError) {
        observer.error(new Error(error));
      } else {
        observer.next(this.videoUrlsMock);
      }
      observer.complete();
    });
  }
}
