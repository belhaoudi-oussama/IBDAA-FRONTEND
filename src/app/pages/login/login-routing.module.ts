import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from '../group/groups/groups.component';

const routes: Routes = [
  {path:"", redirectTo:"/welcome" },
 { path: 'welcome', loadChildren:'../../pages/welcome/welcome.module' },
//   { path: 'formations', loadChildren: () => import('../../pages/formation/formation.module').then(m => m.FormationModule) },
  // { path: 'groups',  component:GroupsComponent},
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
