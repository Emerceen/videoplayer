import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { VideoMock } from './video-mock.spec';

export class VideoMockService  {
  public videoUrlsMock: VideoMock = new VideoMock();
  public videoUrlsError: boolean =  false;
  public currentVideoIndex: Subject<number> = new Subject<number>();
  public currentVideoIndexOnChange: Observable<number> = this.currentVideoIndex.asObservable();
  public playedVideoIndex: Subject<number> = new Subject<number>();
  public playedVideoIndexOnChange: Observable<number> = this.playedVideoIndex.asObservable();
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

  changeCurrentVideo(index: number = 0): void {
    this.currentVideoIndex.next(index);
  }

  changePlayedVideo(index: number): void {
    this.currentVideoIndex.next(index);
  }
}
