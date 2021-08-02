import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupsComponent } from './groups/groups.component';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/shared/nz.module';
import { CandidatesListComponent } from './groups/candidates-list/candidates-list.component';
import { FormsModule } from '@angular/forms';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path : "" , component : GroupsComponent},
];
@NgModule({
  declarations: [
    GroupComponent,
    GroupsComponent,
    CandidatesListComponent,
    CreateGroupComponent,
    
  ],
  imports: [
    CommonModule,
    NzModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class GroupModule { }
