import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaComponent } from '../movies/components/pelicula/pelicula.component';
import { MainComponent } from './components/main/main.component';
import { PeliculaDetalleComponent } from '../movies/components/peliculadetalle/peliculadetalle.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent
  },
  { 
    path: 'movie/:id', 
    component: PeliculaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }