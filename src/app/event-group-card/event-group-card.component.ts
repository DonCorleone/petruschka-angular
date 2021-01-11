import { Component, OnInit, Input } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';
import { EventDetail } from '../event.service';
const GET_EVENTGROUP_BYID = gql`
  query GetEventGroupById($id: Int!) {
    eventGroup (query:{_id:$id}){
      name,
      _id,
      bannerImagePath
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

  eventgroupId: number;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  ngOnInit() {
    // this.querySubscription = this.apollo
    //   .watchQuery<GetEventGroupById>({
    //     query: GET_EVENTGROUP_BYID,
    //     variables: {
    //       id: this.eventgroupId,
    //     },
    //   })
    //   .valueChanges.subscribe(({data}) => {
    //     this.eventgroupId = data.eventGroup;
    //   });
  }
  // ngOnDestroy() {
  //   this.querySubscription.unsubscribe();
  // }
}

