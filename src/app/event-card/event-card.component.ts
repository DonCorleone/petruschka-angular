import { Component, Input, OnInit } from '@angular/core';
import { } from '../event.service';
import { EventGroupEventEvent } from '../models/event-group-event.models';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  get eventLink(){
    return this.eventInfo ? "https://www.ticketino.com/de/Event/" + this.eventInfo.name + "/" + this.eventInfo._id: "";
  }

  constructor() { }

  @Input() type: 'horizontal' | 'vertical' = 'horizontal';
  @Input() eventInfo: EventGroupEventEvent;
  @Input() showBuyButton: boolean;

  ngOnInit(): void {
  }
}
