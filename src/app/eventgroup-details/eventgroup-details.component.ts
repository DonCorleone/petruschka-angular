import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventGroupEvent, EventGroupEventEvent, EventInfo, EventService } from '../event.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EventGroup } from '../event-groups.service';
import { Apollo, gql } from 'apollo-angular';

interface GetEventGroupById{
  eventGroup: EventGroup
}
const GET_EVENTGROUP_BYID = gql`
  query GetEventGroupById($id: Int!) {
    eventGroup (query:{_id:$id}){
      name,
      _id,
      bannerImagePath
    }
  }
`;

interface GetEventsByGroupId{
  eventGroupEvents: EventGroupEvent[]
}
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
@Component({
  selector: 'app-eventgroup-details',
  templateUrl: './eventgroup-details.component.html',
  styleUrls: ['./eventgroup-details.component.scss']
})
export class EventgroupDetailsComponent implements OnInit {

  eventgroup: EventGroup;
  eventInfos$: Observable<EventGroupEventEvent[]>;
  eventInfoPrototype: Observable<Event>;
  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute, private  apollo : Apollo) { }

  // tslint:disable-next-line:no-inferrable-types
  @Input() showBuyButton: boolean = true;

  ngOnInit(): void {
    this.route.params
      .pipe(map(p => p.eventgroupId))
      .subscribe(id => {
        this.querySubscription = this.apollo
        .watchQuery<GetEventGroupById>({
          query: GET_EVENTGROUP_BYID,
          variables: {
            id: id,
          },
        })
        .valueChanges.subscribe(({data}) => {
          this.eventgroup = data.eventGroup;
        });

        this.eventInfos$ = this.apollo
        .watchQuery<GetEventsByGroupId>({
          query: GET_EVENTS_BYGROUPID,
          variables: {
            eventGroupId: id,
          },
        })
        .valueChanges
          .pipe(map((result) => result.data.eventGroupEvents))
          .pipe(map(p => p[0].events))
        });

    // this.eventInfos$
    //   .pipe(map(p => p[0].id))
    //   .subscribe(id => {
    //     this.eventInfoPrototype = this.eventservice.getEventById(id);
    //   });
  }
}
