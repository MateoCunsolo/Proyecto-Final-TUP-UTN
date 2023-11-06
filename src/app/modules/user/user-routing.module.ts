import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNameComponent } from './components/change-name/change-name.component';

const routes: Routes = [
  {path: 'change-username', component:ChangeNameComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
