import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInfo, EventService } from '../event.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventGroup, EventGroupsService } from '../event-groups.service';

@Component({
  selector: 'app-eventgroup-details',
  templateUrl: './eventgroup-details.component.html',
  styleUrls: ['./eventgroup-details.component.scss']
})
export class EventgroupDetailsComponent implements OnInit {
  eventgroup: EventGroup;
  eventInfos$: Observable<EventInfo[]>;

  constructor(
    private route: ActivatedRoute,
    private eventgroupService: EventGroupsService,
    private eventservice: EventService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(map(p => p.eventgroupId))
      .subscribe(id => {
        this.eventgroupService.getEventGroupById(id)
          .subscribe(eventgroup => this.eventgroup = eventgroup);
      });
    this.route.params
      .pipe(map(p => p.eventgroupId))
      .subscribe(id => {
        this.eventInfos$ = this.eventservice.getEventsByGroupById(id);
      });
  }
}
