import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationComponent } from './formation.component';
import { FormationRoutingModule } from './formation-routing.module';



@NgModule({
  declarations: [
    FormationComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule
  ]
})
export class FormationModule { }
