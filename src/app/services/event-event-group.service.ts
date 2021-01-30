import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventGroupEvent, EventGroupEventEvent } from '../models/event-group-event.models';
import { EventEventGroupUsageEvent } from '../models/event.models';

const GET_EVENTGROUPID_BYEVENTID = gql`
  query GetEventGroupIdByEventId($eventId: Int!, $usage: String!) {
    eventEventGroupUsageEvent (query:{eventId:$eventId, usage:$usage}){
      eventGroupId
    }
  }
`;

const GET_EVENTGROUPEVENTS_BYGROUPID = gql`
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

interface GetEventsByGroupId {
  eventGroupEvents: EventGroupEvent[]
}
interface GetEventGroupIdByEventId {
  eventEventGroupUsageEvent: EventEventGroupUsageEvent;
}

@Injectable({
  providedIn: 'root'
})
export class EventEventGroupService {

  GetEventGroupIdByEventId(eventDetailIdIn: number, usageIn: string): Observable<number> {
    return this.apollo
      .watchQuery<GetEventGroupIdByEventId>({
        query: GET_EVENTGROUPID_BYEVENTID,
        variables: {
          eventId: eventDetailIdIn,
          usage: usageIn
        },
      })
      .valueChanges.pipe(map((result) => result.data.eventEventGroupUsageEvent.eventGroupId));
  }


  GetEventGroupEvents(eventGroupIdIn: number): Observable<EventGroupEventEvent[]> {
    return this.apollo
    .watchQuery<GetEventsByGroupId>({
      query: GET_EVENTGROUPEVENTS_BYGROUPID,
      variables: {
        eventGroupId: eventGroupIdIn,
      },
    })
    .valueChanges
      .pipe(map((result) => result.data.eventGroupEvents))
      .pipe(map(p => p[0].events))
  }

  constructor(private apollo: Apollo) { }
}
