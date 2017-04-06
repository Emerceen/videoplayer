export class NativeElementStub {
  public containsValue: boolean = false;
  public poster: string = '';
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
