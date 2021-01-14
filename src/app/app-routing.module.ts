import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventGroupsComponent } from './components/event-groups/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LocationComponent } from './components/location/location.component';
import { RealmAuthGuardGuard } from './realm-auth-guard.guard';
import { StaffComponent } from './components/staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: EventGroupsComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }, {
    path: 'eventgroups/:eventgroupId',
    component: EventDetailsComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }, {
    path: 'locations/:eventLocationName',
    component: LocationComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }, {
    path: 'staff/:staffName',
    component: StaffComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
