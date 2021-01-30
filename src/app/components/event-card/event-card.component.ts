import { Component, Input, OnInit } from '@angular/core';
import { } from '../../services/event.service';
import { EventGroupEventEvent } from '../../models/event-group-event.models';
import { time } from 'console';

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

  get showBuyButton(): boolean{
    return (new Date(this.eventInfo.start) > new Date());
  }

  ngOnInit(): void {
  }
}
