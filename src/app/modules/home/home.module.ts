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

  ],
  exports: [
      FilteringComponent
  ]
  
})
export class HomeModule { }