import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventGroup, EventGroupsService } from '../event-groups.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eventgroup-details',
  templateUrl: './eventgroup-details.component.html',
  styleUrls: ['./eventgroup-details.component.scss']
})
export class EventgroupDetailsComponent implements OnInit {
  eventgroup: EventGroup;
  events$: Observable<Event[]>;

  constructor(
    private route: ActivatedRoute,
    private eventgroupService: EventGroupsService) { }

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
        this.events$ = this.eventgroupService.getEventsByGroupById(id);
      });
  }
}
