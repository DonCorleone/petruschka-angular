import { Component, Input, OnInit } from '@angular/core';
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
  eventInfoPrototype: Observable<Event>;

  constructor(
    private route: ActivatedRoute,
    private eventgroupService: EventGroupsService,
    private eventservice: EventService) { }

  // tslint:disable-next-line:no-inferrable-types
  @Input() showBuyButton: boolean = true;

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

    this.eventInfos$
      .pipe(map(p => p[0].id))
      .subscribe(id => {
        this.eventInfoPrototype = this.eventservice.getEventById(id);
      });
  }
}
