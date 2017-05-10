export class ChannelInterface {
  Id: string;
  Name: string;
  AvatarUrl: string;
}

export class Channel {
  static fromData(data: ChannelInterface): Channel {
    return new Channel(data.Id, data.Name, data.AvatarUrl);
  }

  constructor(
    public id: string,
    public name: string,
    public avatarUrl: string
  ) {}
}
