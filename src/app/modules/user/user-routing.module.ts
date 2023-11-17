import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { AuthGuardGuard } from '../auth/guards/auth-guard.guard';

const routes: Routes = [
  {path: 'change-username', component:ChangeNameComponent , canActivate: [AuthGuardGuard] } ,
  {path: 'change-pass', component:ChangePassComponent , canActivate: [AuthGuardGuard] },
  {path: 'change-email', component:ChangeEmailComponent , canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
