import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventGroup } from './event-groups.service';

export interface EventGroupEventEvent {
  _id: number;
  name: string;
  start: Date;
}

export interface EventGroupEvent {
  eventGroupId: number;
  events: EventGroupEventEvent[];
}

export interface EventInfo {
  _id: number;
  name: string;
  start: Date;
  canBeRemovedFromEventGroup: boolean;
}

export interface EventOverview {
  events: EventInfo[];
  numberOfEvents: number;
}

export interface GetEventGroupById{
  eventGroup: EventGroup
}

export interface GetEventsByGroupId{
  eventGroupEvents: EventGroupEvent[]
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(
      '/api/Event/' + id);
  }

  constructor(private http: HttpClient) { }

  // getEventsByGroupById(id: number): Observable<EventInfo[]> {
  //   return this.http.get<EventOverview>(
  //     `/api/${id}`).pipe(map(p => p.events)); // api/eventOverview?eventGroupId=3080
  // }
}
