import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'src/components/account/account.component';
import { AdmindashboardComponent } from 'src/components/admindashboard/admindashboard.component';
import { InnerdashboardComponent } from 'src/components/innerdashboard/innerdashboard.component';
import { LandingComponent } from 'src/components/landing/landing.component';
import { PathwaysComponent } from 'src/components/pathways/pathways.component';
import { UserdashboardComponent } from 'src/components/userdashboard/userdashboard.component';
import { UsersComponent } from 'src/components/users/users.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'inner-dashboard',
    component: InnerdashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'pathways', component: PathwaysComponent, canActivate: [AuthGuard] },
  {
    path: 'user-dashboard',
    component: UserdashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
