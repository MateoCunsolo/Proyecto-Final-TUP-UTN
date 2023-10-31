import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { PeliculaDetalleComponent } from './components/peliculadetalle/peliculadetalle.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    PeliculaComponent,
    PeliculaDetalleComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  exports:[
    PeliculaComponent,
    PeliculaDetalleComponent,
    CommentsComponent
  ]
})
export class MoviesModule { }
