import { Observable } from 'rxjs/Rx';

import { ChannelMock } from './channel-mock.spec';
import { ChannelArray } from './../entities/channel-array';
import { Channel } from './../entities/channel';

export class ChannelDataMockService  {
  public channelMock: ChannelMock = new ChannelMock();
  public channelError: boolean =  false;
  public getChannels(): Observable<ChannelArray> {
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

  public getChannelId(id: string): Observable<Channel> {
    return Observable.create(observer => {
      if (this.channelError) {
        observer.error(new Error(id));
      } else {
        observer.next(this.channelMock[0]);
      }
      observer.complete();
    });
  }
}
