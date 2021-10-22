import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationsComponent } from './formations.component';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/shared/nz.module';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
  {path : "" , component : FormationsComponent},
  { path: 'sessions/:id', component: SessionComponent },
];

@NgModule({
  declarations: [
    FormationsComponent,
    SessionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzModule
  ]
})
export class FormationsModule { }
