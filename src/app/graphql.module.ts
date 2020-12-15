import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

import * as realm from './realm';
import { HttpHeaders } from '@angular/common/http';
const uri = realm.graphqlUrl;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	return {
		link: httpLink.create({
			uri,
			headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
		}),
		cache: new InMemoryCache()
	};
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
