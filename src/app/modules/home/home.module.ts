import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PeliculaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
