import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'view', loadChildren: () => import('./formations/formations.module').then(m => m.FormationsModule) },
  { path: 'create', loadChildren: () => import('./create-formation/create-formation.module').then(m => m.CreateFormationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }