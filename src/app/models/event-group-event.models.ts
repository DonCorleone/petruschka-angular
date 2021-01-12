export interface EventGroupEvent {
  eventGroupId: number;
  events: EventGroupEventEvent[];
}

export interface EventGroupEventEvent {
  _id: number;
  name: string;
  start: Date;
}
