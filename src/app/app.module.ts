import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { EventGroupCardComponent } from './event-group-card/event-group-card.component';
import { EventgroupDetailsComponent } from './eventgroup-details/eventgroup-details.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
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
  declarations: [
    AppComponent,
    LayoutComponent,
    EventGroupsComponent,
    EventGroupCardComponent,
    EventgroupDetailsComponent,
    EventCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ScullyLibModule,
    HttpClientModule,
    ScullyLibModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
