import { Observable } from 'rxjs/Rx';
import { ChannelMock } from './channel-mock.spec';

export class ChannelDataMockService  {
  public channelMock: ChannelMock = new ChannelMock();
  public channelError: boolean =  false;
  public getChannels(): Observable<any> {
    let error = `err`;
    return Observable.create(observer => {
      if (this.channelError) {
        observer.error(new Error(error));
      } else {
        observer.next(this.channelMock);
      }
      observer.complete();
    });
  }
}
