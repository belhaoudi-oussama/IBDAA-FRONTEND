import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './pages/group/groups/groups.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/authentification/auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent},
  //  { path: 'formations', loadChildren: () => import('./pages/formation/formation.module').then(m => m.FormationModule) },
   { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    /*canActivate: [AuthService],*/
    children: [
      { path: 'groups', loadChildren: () => import('./pages/group/group.module').then(m => m.GroupModule)/*,canActivate: [AuthService], */},
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),/*canActivate: [AuthService],*/ },
      { path: 'formations', loadChildren: () => import('./pages/formation/formation.module').then(m => m.FormationModule),/*canActivate: [AuthService],*/ }

    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
