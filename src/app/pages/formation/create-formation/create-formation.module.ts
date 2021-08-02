import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormationComponent } from './create-formation.component';
import { CreateSessionsComponent } from './create-sessions/create-sessions.component';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/shared/nz.module';


const routes: Routes = [
  {path : "" , component : CreateFormationComponent},
];
@NgModule({
  declarations: [
    CreateFormationComponent,
    CreateSessionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzModule
  ]
})
export class CreateFormationModule { }
