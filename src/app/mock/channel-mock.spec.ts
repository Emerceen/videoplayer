import { Channel, ChannelInterface } from '../entities/channel';

export class ChannelMock {
  public channels: Array<Channel> = [
    {
      id: '10001',
      name: 'channel1',
      avatarUrl: 'url1'
    },
    {
      id: '10002',
      name: 'channel2',
      avatarUrl: 'url2'
    }
  ];
}

export class ChannelMockPascalCase {
  public Channels: Array<ChannelInterface> = [
    {
      Id: '10001',
      Name: 'channel1',
      AvatarUrl: 'url1'
    },
    {
      Id: '10002',
      Name: 'channel2',
      AvatarUrl: 'url2'
    }
  ];
}
