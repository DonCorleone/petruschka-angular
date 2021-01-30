import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { } from '../../services/event.service';
import { EventDetail } from '../../models/event.models';
import { EventGroupsService } from 'src/app/services/event-groups.service';
import { EventEventGroupService } from 'src/app/services/event-event-group.service';

@Component({
  selector: 'app-event-detail-card',
  templateUrl: './event-detail-card.component.html',
  styleUrls: ['./event-detail-card.component.scss']
})
export class EventDetailCardComponent implements OnInit {

  get name() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name: null;
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

  eventgroupId$: Observable<number>;
  actionName: string;

  constructor(private eventEventGroupService: EventEventGroupService) {}

  ngOnInit() {

    this.eventgroupId$ = this.eventEventGroupService.GetEventGroupIdByEventId(this.eventDetailId, this.usage);

    if (this.usage == "Premiere") {
      this.actionName = "Details / Kartenkauf";
    } else if (this.usage == "CD") {
      this.actionName = "Details / CD- Kauf";
    } else {
      this.actionName = "Details / Buchungsanfrage";
    }
  }
}

