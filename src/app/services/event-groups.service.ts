import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EventGroup } from '../models/event-group.models';

const GET_EVENTGROUP_BYID = gql`
query GetEventGroupById($id: Int!) {
  eventGroup (query:{_id:$id}){
    name,
    _id,
    bannerImagePath
  }
}
`;

export interface GetEventGroupById {
  eventGroup: EventGroup
}

@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  constructor(private apollo: Apollo) { }

  GetEventGroup(idIn: number) {
    return this.apollo
    .watchQuery<GetEventGroupById>({
      query: GET_EVENTGROUP_BYID,
      variables: {
        id: idIn,
      },
    })
  }
}
