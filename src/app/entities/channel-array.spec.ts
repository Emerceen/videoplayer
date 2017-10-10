import { ChannelArray, ChannelArrayInterface } from './channel-array';
import { Channel } from './channel';

let data: ChannelArrayInterface = {
  Channels: [
    {
      Id: '10001',
      Name: 'test name',
      AvatarUrl: 'test avatarUrl'
    }
  ]
};

describe('ChannelArray', () => {
  it('should create ChannelArray instance from data of type ChannelArrayInterface and create Video instance of type VideoInterface', () => {
    expect(ChannelArray.fromData(data) instanceof ChannelArray).toBeTruthy();
    expect(ChannelArray.fromData(data).channels[0] instanceof Channel).toBeTruthy();
  });

  it('should create Video instance with constructor and playedInShuffle value', () => {
    expect(new Channel('10001', 'name', 'avatarUrl') instanceof Channel).toBeTruthy();
  });
});
