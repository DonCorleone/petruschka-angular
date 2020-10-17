import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface EventInfo {
  id: number;
  name: string;
  start: Date;
  canBeRemovedFromEventGroup: boolean;
}

export interface EventOverview {
  events: EventInfo[];
  numberOfEvents: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEventsByGroupById(id: number): Observable<EventInfo[]> {
    return this.http.get<EventOverview>(
      `/api/${id}`).pipe(map(p => p.events)); // api/eventOverview?eventGroupId=3080
  }
}
