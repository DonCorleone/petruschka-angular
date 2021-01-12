import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { EventDetail, EventEventGroupUsageEvent } from '../models/event.models';

const GET_EVENTGROUPS_BYEVENT_TAG = gql`
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

const GET_EVENTGROUPID_BYEVENTID = gql`
  query GetEventGroupIdByEventId($eventId: Int!, $usage: String!) {
    eventEventGroupUsageEvent (query:{eventId:$eventId, usage:$usage}){
      eventGroupId
    }
  }
`;

interface GetEventDetailPrototypes {
  eventDetails: EventDetail[];
}

interface GetEventGroupIdByEventId {
  eventEventGroupUsageEvent: EventEventGroupUsageEvent;
}


@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  constructor(private apollo: Apollo) { }

  GetEventGroupID(eventDetailIdIn: number, usageIn: string): Observable<number> {
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

  GetEventGroup(filterPredicateIn: any): Observable<EventDetail[]>{
    return this.apollo
      .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTGROUPS_BYEVENT_TAG})
      .valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
    }
}
