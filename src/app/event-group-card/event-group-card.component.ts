import { Component, OnInit, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { EventGroup, EventGroupsService } from '../event-groups.service';

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

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent implements OnInit {

  get name() { return (this.eventgroup && this.eventgroup.name) ? this.eventgroup.name : null }
  get bannerImagePath() { return (this.eventgroup && this.eventgroup.bannerImagePath) ? this.eventgroup.bannerImagePath : null }
  get eventGroupId() { return (this.eventgroup && this.eventgroup._id) ? this.eventgroup._id : null }

  eventgroup: EventGroup;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  @Input() eventgroupId: number;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<GetEventGroupById>({
        query: GET_EVENTGROUP_BYID,
        variables: {
          id: this.eventgroupId,
        },
      })
      .valueChanges.subscribe(({data}) => {
        this.eventgroup = data.eventGroup;
      });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
