import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetEventDetailPrototypes, GET_EVENTGROUPS_BYEVENT_TAG } from '../event-groups.service';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';
import { EventDetail } from '../event.service';

@Component({
  selector: 'app-eventgroups',
  templateUrl: './event-groups.component.html',
  styleUrls: ['./event-groups.component.scss']
})
export class EventGroupsComponent implements OnInit {

  eventDetails$: Observable<EventDetail[]>;
  eventDetailsTournee$: Observable<EventDetail[]>;
  eventDetailsCD$: Observable<EventDetail[]>;

  loading: boolean;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.eventDetails$ = this.apollo
      .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTGROUPS_BYEVENT_TAG})
      .valueChanges.pipe(map((result) => result.data.eventDetails.filter(p=>p.googleAnalyticsTracker == "Premiere")));
    this.eventDetailsTournee$ = this.apollo
      .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTGROUPS_BYEVENT_TAG})
      .valueChanges.pipe(map((result) => result.data.eventDetails.filter(p=>p.googleAnalyticsTracker == "Tournee")));
    this.eventDetailsCD$ = this.apollo
        .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTGROUPS_BYEVENT_TAG})
        .valueChanges.pipe(map((result) => result.data.eventDetails.filter(p=>p.facebookPixelId == "CD")));
  }
}
