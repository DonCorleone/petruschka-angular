import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { EventgroupDetailsComponent } from './eventgroup-details/eventgroup-details.component';
import { LocationComponent } from './location/location.component';
import { RealmAuthGuardGuard } from './realm-auth-guard.guard';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: EventGroupsComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }, {
    path: 'eventgroups/:eventgroupId',
    component: EventgroupDetailsComponent,
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
