import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { EventgroupDetailsComponent } from './eventgroup-details/eventgroup-details.component';
import { RealmAuthGuardGuard } from './realm-auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: EventGroupsComponent,
    canActivate: [ RealmAuthGuardGuard ]
  }, {
    path: 'eventgroups/:eventgroupId',
    component: EventgroupDetailsComponent,
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
