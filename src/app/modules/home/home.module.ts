import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { PeliculaDetalleComponent} from './components/peliculadetalle/peliculadetalle.component';


@NgModule({
  declarations: [
    PeliculaComponent,
    MainComponent,
    PeliculaDetalleComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }