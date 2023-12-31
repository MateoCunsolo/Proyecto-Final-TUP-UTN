import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: '',
    loadChildren: ()=> import('./modules/landing/landing.module').then(m=>m.LandingModule)
  },
  {
    path:'home',
    loadChildren: ()=> import('./modules/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'user',
    loadChildren: ()=> import('./modules/user/user.module').then(m=>m.UserModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
