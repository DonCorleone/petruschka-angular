import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EventGroupInfo {
  id: number;
  name: string;
  dateCreated: Date;
}

export interface EventGroupOverview {
  eventGroups: EventGroupInfo[];
  numberOfEventGroups: number;
  canCrudEventGroups: boolean;
}

export interface EventGroup {
  id: number;
  organizerId: number;
  name: string;
  bannerImagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  constructor(private http: HttpClient) { }

  getEventGroups(): Observable<EventGroupInfo[]> {
    return this.http.get<EventGroupOverview>(
      '/api/eventGroupOverview').pipe(map(p => p.eventGroups));
  }

  getEventGroupById(id: number): Observable<EventGroup | null> {
    return this.http.get<EventGroup>(
      '/api/EventGroup/' + id);
  }
}
