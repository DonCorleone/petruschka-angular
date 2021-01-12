import { gql } from "apollo-angular";

export const GET_STAFF_BY_NAME = gql`
query GetStaffByName($name: String!) {
  staff(query:{name:$name}){
    name
    bio
  }
}
`;

export interface Staff {
  bio: string;
  name: string;
};

export interface GetStaffByName {
  staff: Staff;
};
