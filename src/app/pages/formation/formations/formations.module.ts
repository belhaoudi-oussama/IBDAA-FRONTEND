import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationsComponent } from './formations.component';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/shared/nz.module';

const routes: Routes = [
  {path : "" , component : FormationsComponent},
];

@NgModule({
  declarations: [
    FormationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzModule
  ]
})
export class FormationsModule { }
