import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaDetalleComponent } from './modules/movies/components/peliculadetalle/peliculadetalle.component';
import { CommentsComponent } from './modules/movies/components/comments/comments.component';

const routes: Routes = [ 
  {
  path: '',
  loadChildren: ()=> import('./modules/landing/landing.module').then(m=>m.LandingModule)
  },
  {
    path:'home',
    loadChildren: ()=> import('./modules/home/home.module').then(m=>m.HomeModule)
  }
  ,
  {
    path:'co',
    component:CommentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
