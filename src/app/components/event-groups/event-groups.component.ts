import { Component, OnInit } from '@angular/core';
import { EventGroupsService } from '../../services/event-groups.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { EventDetail } from '../../models/event.models';

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

  constructor(private apollo: Apollo, private eventGroupsService: EventGroupsService) {}

  ngOnInit() {
    this.eventDetails$ = this.eventGroupsService.GetEventGroup(p=>p.googleAnalyticsTracker == "Premiere");
    this.eventDetailsTournee$ = this.eventGroupsService.GetEventGroup(p=>p.googleAnalyticsTracker == "Tournee");
    this.eventDetailsCD$ = this.eventGroupsService.GetEventGroup(p=>p.facebookPixelId == "CD");
  }
}
