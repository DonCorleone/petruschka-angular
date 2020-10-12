import { Component, OnInit, Input } from '@angular/core';
import { EventGroup } from '../event-groups.service';

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent implements OnInit {

  constructor() { }

  @Input() eventgroup: EventGroup;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @Input() showBuyButton: boolean;

  ngOnInit(): void {
  }

}
