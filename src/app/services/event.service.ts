import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EventGroupEvent, EventGroupEventEvent } from '../models/event-group-event.models';
import { EventDetail } from '../models/event.models';
import { EmptyObject } from 'apollo-angular/types';
import { EventGroup } from '../models/event-group.models';

const GET_EVENTS_BYGROUPID = gql`
  query GetEventsByGroupId($eventGroupId: Int!){
    eventGroupEvents(query:{eventGroupId:$eventGroupId}){
      eventGroupId
      events{
        _id
        name
        start
      }
    }
  }
`;

const GET_EVENTINFO_BYID = gql`
query GetEventByGroupId($eventId: Int!){
  eventDetails(query:{_id:$eventId}){
    eventInfos{
      languageId
      shortDescription
      longDescription
      address
      location
      bannerImagePath
      artists
    }
  }
}
`;

const GET_EVENTGROUP_BYID = gql`
query GetEventGroupById($id: Int!) {
  eventGroup (query:{_id:$id}){
    name,
    _id,
    bannerImagePath
  }
}
`;

interface GetEventsByGroupId {
  eventGroupEvents: EventGroupEvent[]
}

interface GetEventInfoById {
  eventDetails: EventDetail[];
}

export interface GetEventGroupById {
  eventGroup: EventGroup
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  GetEventDetails(id: number) : QueryRef<GetEventInfoById, EmptyObject> {
    return this.apollo
    .watchQuery<GetEventInfoById>({
      query: GET_EVENTINFO_BYID,
      variables: {
        eventId: id,
      },
    });
  }

  GetEventGroupEvents(eventGroupIdIn: number): Observable<EventGroupEventEvent[]> {
    return this.apollo
    .watchQuery<GetEventsByGroupId>({
      query: GET_EVENTS_BYGROUPID,
      variables: {
        eventGroupId: eventGroupIdIn,
      },
    })
    .valueChanges
      .pipe(map((result) => result.data.eventGroupEvents))
      .pipe(map(p => p[0].events))
  }

  GetEventGroup(idIn: number) {
    return this.apollo
    .watchQuery<GetEventGroupById>({
      query: GET_EVENTGROUP_BYID,
      variables: {
        id: idIn,
      },
    })
  }

  constructor(private apollo: Apollo) { }
}
