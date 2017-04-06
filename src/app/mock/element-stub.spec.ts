import { NativeElementStub } from './native-element-stub.spec';

export class ElementStub {
  nativeElement: NativeElementStub = new NativeElementStub();
  playVideo(): null {
    return;
  };
  stopVideo(): null {
    return;
  };
}
