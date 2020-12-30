import { Injectable } from '@angular/core';

export interface EventLocation {
  city: string;
  directions: string;
  info: string;
  name: string;
  postalCode: string;
  street: string;
};

export interface GetEventLocationByName {
  eventLocation: EventLocation;
};

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor() { }
}
