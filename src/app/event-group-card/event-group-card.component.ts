import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGroup, EventGroupsService } from '../event-groups.service';

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent implements OnInit {

  constructor(private eventGroupsService: EventGroupsService) { }

  @Input() eventgroupId: number;
  @Input() eventgroup: EventGroup;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  ngOnInit(): void {
    this.eventGroupsService.getEventGroupById(this.eventgroupId).subscribe(p => this.eventgroup = p);
  }
}
