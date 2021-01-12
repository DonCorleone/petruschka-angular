import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { } from '../../services/event.service';
import { EventDetail } from '../../models/event.models';
import { EventGroupsService } from 'src/app/services/event-groups.service';

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent implements OnInit {

  get name() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].eventName: null;
  }

  get bannerImagePath() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].bannerImagePath : null;
  }

  get eventDetailId() {
    return (this.eventDetail && this.eventDetail._id) ? this.eventDetail._id : null;
  }

  @Input() eventDetail: EventDetail;
  @Input() usage: string;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  eventgroupId$: Observable<number>;

  constructor(private eventGroupService: EventGroupsService) {}

  ngOnInit() {

    this.eventgroupId$ = this.eventGroupService.GetEventGroupID(this.eventDetailId, this.usage);
  }
}

