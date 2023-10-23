import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }