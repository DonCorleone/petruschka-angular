import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EventGroupOverview {
  id: number;
  name: string;
  dateCreated: Date;
}

export interface EventGroupOverviews {
  eventGroupOverviews: EventGroupOverview[];
}

export interface EventGroup {
  _id: number;
  organizerId: number;
  name: string;
  bannerImagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  constructor(private http: HttpClient) { }

  // getEventGroups(): Observable<EventGroupOverview[]> {
  //   return this.http.get<EventGroupOverview>(
  //     '/api/eventGroupOverview').pipe(map(p => p.eventGroups));
  // }

  getEventGroupById(id: number): Observable<EventGroup | null> {
    return this.http.get<EventGroup>(
      '/api/EventGroup/' + id);
  }
}
