import { BufferedStub } from './buffered-stub.spec';

export class NativeElementStub {
  public containsValue: boolean = false;
  public poster: string = '';
  public buffered: BufferedStub = new BufferedStub();
  public played: boolean = false;
  load(): void {
    return;
  };
  play(): void {
    return;
  };
  pause(): void {
    return;
  };
  contains(): boolean {
    return this.containsValue;
  };
}
