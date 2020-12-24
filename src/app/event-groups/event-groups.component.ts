import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGroupOverview, EventGroupOverviews } from '../event-groups.service';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

// We use the gql tag to parse our query string into a query document
const GET_EVENT_GROUPS_INFOS = gql`
  query GetEventGroupOverviews {
    eventGroupOverviews{
      name,
      id,
      dateCreated
    }
  }
`;

@Component({
  selector: 'app-eventgroups',
  templateUrl: './event-groups.component.html',
  styleUrls: ['./event-groups.component.scss']
})
export class EventGroupsComponent implements OnInit {

  eventgroups$: Observable<EventGroupOverview[]>;
  loading: boolean;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.eventgroups$ = this.apollo
      .watchQuery<EventGroupOverviews>({query: GET_EVENT_GROUPS_INFOS})
      .valueChanges.pipe(map((result) => result.data.eventGroupOverviews));
  }
}
