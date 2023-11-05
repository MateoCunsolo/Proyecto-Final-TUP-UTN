import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PeliculaComponent } from '../movies/components/pelicula/pelicula.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { PeliculaDetalleComponent} from '../movies/components/peliculadetalle/peliculadetalle.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { MoviesModule } from '../movies/movies.module';
import { ListsModule } from '../lists/lists.module';


@NgModule({
  declarations: [
    MainComponent,
    FilteringComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MoviesModule,
    ListsModule
  ],
  exports: [
      FilteringComponent
  ]
  
})
export class HomeModule { }