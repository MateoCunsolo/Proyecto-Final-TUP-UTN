import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RegisterComponent } from '../auth/components/register/register.component';

const routes: Routes = [
  
  {
    path: "",
    component: LandingpageComponent
  },
  {
    path: "signup",
    component:  RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
