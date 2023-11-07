import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';

const routes: Routes = [
  {path: 'change-username', component:ChangeNameComponent},
  {path: 'change-pass', component:ChangePassComponent},
  {path: 'change-email', component:ChangeEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
