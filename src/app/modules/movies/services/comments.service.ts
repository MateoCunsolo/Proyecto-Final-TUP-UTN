import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  private eventSubject = new Subject<any>();

  emitEvent(event: any) {
    this.eventSubject.next(event);
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }
}
