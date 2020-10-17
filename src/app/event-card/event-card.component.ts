import { Component, Input, OnInit } from '@angular/core';
import { EventInfo } from '../event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  constructor() { }

  @Input() type: 'horizontal' | 'vertical' = 'horizontal';
  @Input() eventInfo: EventInfo;
  @Input() showBuyButton: boolean;

  ngOnInit(): void {
  }

}
