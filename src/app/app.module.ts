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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
