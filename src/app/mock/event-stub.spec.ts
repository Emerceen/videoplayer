import { TargetStub } from './target-stub.spec';

export class EventStub {
  target: TargetStub = new TargetStub();
  offsetX: number;
  stopPropagation(): null {
    return;
  }
}
