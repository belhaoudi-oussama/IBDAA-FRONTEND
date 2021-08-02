import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CreateGroupComponent } from './create-group/create-group.component';



@NgModule({
  declarations: [
    GroupsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class GroupsModule { }
