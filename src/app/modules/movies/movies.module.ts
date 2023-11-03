import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { PeliculaDetalleComponent } from './components/peliculadetalle/peliculadetalle.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsComponent } from './components/comments/comments.component';

import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { AddlistComponent } from './components/addlist/addlist.component';



@NgModule({
  declarations: [
    PeliculaComponent,
    PeliculaDetalleComponent,
    CommentsComponent,
    AddCommentComponent,
    AddlistComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    PeliculaComponent,
    PeliculaDetalleComponent,
    CommentsComponent,
    AddCommentComponent
  ]
})
export class MoviesModule { }
