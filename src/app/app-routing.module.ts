import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaDetalleComponent } from './modules/home/components/peliculadetalle/peliculadetalle.component';

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
    path: 'movie-detail/:id', 
    component: PeliculaDetalleComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
