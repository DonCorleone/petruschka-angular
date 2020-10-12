import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventGroupsComponent } from './event-groups/event-groups.component';

const routes: Routes = [{
  path: '',
  component: EventGroupsComponent,
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
