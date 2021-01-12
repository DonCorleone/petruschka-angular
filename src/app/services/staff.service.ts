import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Staff } from '../models/staff.models';

const GET_STAFF_BY_NAME = gql`
query GetStaffByName($name: String!) {
  staff(query:{name:$name}){
    name
    bio
  }
}
`;

interface GetStaffByName {
  staff: Staff;
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private apollo: Apollo) { }

  public GetStaff(nameIn: string): Observable<Staff>  {
    return this.apollo
        .watchQuery<GetStaffByName>({
          query: GET_STAFF_BY_NAME,
          variables: {
            name: nameIn
          },})
        .valueChanges.pipe(map((result) => result.data.staff));
  }
}

