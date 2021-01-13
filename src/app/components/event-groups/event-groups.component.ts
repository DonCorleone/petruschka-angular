import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { EventDetail } from '../../models/event.models';
import { EventService } from 'src/app/services/event.service';

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

  constructor(private apollo: Apollo, private eventService: EventService) {}

  ngOnInit() {
    this.eventDetails$ = this.eventService.GetEventDetails(p=>p.googleAnalyticsTracker == "Premiere");
    this.eventDetailsTournee$ = this.eventService.GetEventDetails(p=>p.googleAnalyticsTracker == "Tournee");
    this.eventDetailsCD$ = this.eventService.GetEventDetails(p=>p.facebookPixelId == "CD");
  }
}
