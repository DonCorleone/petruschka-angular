import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGroupInfo, EventGroupsService } from '../event-groups.service';

@Component({
  selector: 'app-eventgroups',
  templateUrl: './event-groups.component.html',
  styleUrls: ['./event-groups.component.scss']
})
export class EventGroupsComponent implements OnInit {

  eventgroups$: Observable<EventGroupInfo[]>;

  constructor(private eventGroupsService: EventGroupsService) { }

  ngOnInit(): void {
    this.eventgroups$ = this.eventGroupsService.getEventGroups();
  }
}
