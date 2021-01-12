import { gql } from "apollo-angular";
import { } from "../services/event-groups.service";
import { EventGroup } from "./event-group.models";

export const GET_EVENTGROUPID_BYEVENTID = gql`
  query GetEventGroupIdByEventId($eventId: Int!, $usage: String!) {
    eventEventGroupUsageEvent (query:{eventId:$eventId, usage:$usage}){
      eventGroupId
    }
  }
`;

export const GET_EVENTGROUP_BYID = gql`
query GetEventGroupById($id: Int!) {
  eventGroup (query:{_id:$id}){
    name,
    _id,
    bannerImagePath
  }
}
`;

export const GET_EVENTS_BYGROUPID = gql`
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

export interface EventGroupEvent {
  eventGroupId: number;
  events: EventGroupEventEvent[];
}

export interface EventGroupEventEvent {
  _id: number;
  name: string;
  start: Date;
}

export interface GetEventGroupById {
  eventGroup: EventGroup
}

export interface GetEventsByGroupId {
  eventGroupEvents: EventGroupEvent[]
}
