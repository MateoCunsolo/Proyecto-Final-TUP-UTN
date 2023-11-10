import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { MoviesModule } from '../movies/movies.module';


@NgModule({
  declarations: [
    MainComponent,
    FilteringComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MoviesModule
<<<<<<< HEAD
  ],
=======
    ],
>>>>>>> 1c0aa8379eb49fbb200635f7e09f0c8e722c32ee
  exports: [
      FilteringComponent
  ]
  
})
export class HomeModule { }