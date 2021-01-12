import { gql } from "apollo-angular";
import { EventDetail } from "./event.models";

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
