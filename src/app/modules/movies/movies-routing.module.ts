import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaDetalleComponent } from './components/peliculadetalle/peliculadetalle.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
