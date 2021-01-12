import { gql } from "apollo-angular";

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

export const GET_LOCATION_BY_NAME = gql`
  query GetLocationByName($name: String!) {
    eventLocation:location(query:{name:$name}){
      name
      street
      postalCode
      city
      directions
      info
    }
  }
`;
