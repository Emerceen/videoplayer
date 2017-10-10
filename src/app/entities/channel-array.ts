import { ChannelInterface, Channel } from './channel';

export interface ChannelArrayInterface {
  Channels: Array<ChannelInterface>;
}

export class ChannelArray {
  static fromData(data: ChannelArrayInterface): ChannelArray {
    return new ChannelArray(
      data.Channels.map(channel => Channel.fromData(channel))
    );
  }

  constructor(
    public channels: Array<Channel>
  ) { }
}
