import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilteringService {

  constructor() { }

  private eventSubject = new Subject<any>();

  // Método para emitir eventos con un nombre o identificador
  emitEvent(eventName: string, eventData: any) {
    this.eventSubject.next({ name: eventName, data: eventData });
  }

  // Método para obtener eventos de un tipo específico
  getEvent(eventName: string): Observable<any> {
    return this.eventSubject.asObservable().pipe(
      filter(event => event.name === eventName)
    );
  }
}
