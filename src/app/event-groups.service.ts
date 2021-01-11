import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventDetail } from './event.service';

export const GET_EVENTGROUPS_BYEVENT_TAG = gql`
  query {
    eventDetails (query: { OR: [{facebookPixelId_ne: ""} {googleAnalyticsTracker_ne: ""}]}){
      _id,
      eventInfos{
        eventName
        bannerImagePath
      }
      facebookPixelId
      googleAnalyticsTracker
      start
    }
  }
`;

export interface GetEventDetailPrototypes {
  eventDetails: EventDetail[];
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

  // getEventGroupById(id: number): Observable<EventGroup | null> {
  //   return this.http.get<EventGroup>(
  //     '/api/EventGroup/' + id);
  // }
}
