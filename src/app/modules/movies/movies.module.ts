import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { PeliculaDetalleComponent } from './components/peliculadetalle/peliculadetalle.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PeliculaComponent,
    PeliculaDetalleComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  exports:[
    PeliculaComponent,
    PeliculaDetalleComponent
  ]
})
export class MoviesModule { }
