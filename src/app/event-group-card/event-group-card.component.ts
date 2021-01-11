import { Component, OnInit, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventDetail, GetEventGroupIdByEventId, GetEventsByGroupId } from '../event.service';
const GET_EVENTGROUPID_BYEVENTID = gql`
  query GetEventGroupIdByEventId($eventId: Int!, $usage: String!) {
    eventEventGroupUsageEvent (query:{eventId:$eventId, usage:$usage}){
      eventGroupId
    }
  }
`;

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent implements OnInit {

  get name() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].eventName: null;
  }

  get bannerImagePath() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].bannerImagePath : null;
  }

  get eventDetailId() {
    return (this.eventDetail && this.eventDetail._id) ? this.eventDetail._id : null;
  }

  @Input() eventDetail: EventDetail;
  @Input() usage: string;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  eventgroupId$: Observable<number>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {

    this.eventgroupId$ = this.apollo
      .watchQuery<GetEventGroupIdByEventId>({
        query: GET_EVENTGROUPID_BYEVENTID,
        variables: {
          eventId: this.eventDetailId,
          usage: this.usage
        },
      })
      .valueChanges.pipe(map((result) => result.data.eventEventGroupUsageEvent.eventGroupId));
  }
}

