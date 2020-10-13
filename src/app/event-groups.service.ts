import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EventGroups {
  id: number;
  name: string;
  dateCreated: Date;
}

export interface EventGroup {
  id: number;
  organizerId: number;
  name: string;
  bannerImagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventGroupsService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getEventGroups() {
    return this.http.get<EventGroups[]>(
      'https://my-json-server.typicode.com/DonCorleone/FakeDbPetruschka/EventGroups');
      // .forEach(eg => eg.filter(x => eg.some(y => y.id === x.id)));
    }

  getEventGroupById(id: number): Observable<EventGroup | null> {
      const eventGroups = this.http.get<EventGroups[]>('https://my-json-server.typicode.com/DonCorleone/FakeDbPetruschka/EventGroup');
      eventGroups.pipe(map(eventgroup => {
        const filtered = eventgroup.filter(x => x.id === id);

        if (filtered.length > 0) {
          return filtered[0];
        }

        return null;
      }));

      return null;
  }
}
