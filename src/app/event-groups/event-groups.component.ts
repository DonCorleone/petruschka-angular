import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { EventGroupInfo, EventGroupsService } from '../event-groups.service';

@Component({
  selector: 'app-eventgroups',
  templateUrl: './event-groups.component.html',
  styleUrls: ['./event-groups.component.scss']
})
export class EventGroupsComponent implements OnInit {

  eventgroups$: Observable<EventGroupInfo[]>;

  constructor(private eventGroupsService: EventGroupsService, private apollo: Apollo) {

    this.apollo.watchQuery<any>({
      query: gql`
        query {
            eventGroupInfos{
              name,
              id,
              dateCreated
            }
          }
        `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.eventgroups$ = data.eventGroupInfos;
  });
  }

  ngOnInit(): void {
   // this.eventgroups$ = this.eventGroupsService.getEventGroups();

  }
}
