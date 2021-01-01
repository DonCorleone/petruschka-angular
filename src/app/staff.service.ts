import { Injectable } from '@angular/core';

export interface Staff {
  bio: string;
  name: string;
};

export interface GetStaffByName {
  staff: Staff;
};


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }
}
