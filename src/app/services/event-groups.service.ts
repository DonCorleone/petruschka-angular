import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { EventDetail } from '../models/event.models';

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

@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  public GetEventGroup(filterPredicate: any): Observable<EventDetail[]>{
    return this.apollo
    .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTGROUPS_BYEVENT_TAG})
    .valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicate)));
  }

  constructor(private apollo: Apollo) { }
}
