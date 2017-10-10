import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export class BufferingStateService {
  public subject: Subject<boolean> = new Subject<boolean>();
  public event: Observable<boolean> = this.subject.asObservable();

  public publish(data: any): void {
    this.subject.next(data);
  }
}
