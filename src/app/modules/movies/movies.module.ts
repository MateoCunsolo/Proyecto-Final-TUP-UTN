import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsComponent } from './components/comments/comments.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { AddlistComponent } from './components/addlist/addlist.component';
import { MoviesAllComponent } from './components/movies-all/movies-all.component';
import { MovieDetailComponent} from './components/movie-detail/movies-detail.component';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';


@NgModule({
  declarations: [
    MoviesAllComponent,
    MovieDetailComponent,
    CommentsComponent,
    AddCommentComponent,
    AddlistComponent,
    DeleteMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    MoviesAllComponent,
    MovieDetailComponent,
    CommentsComponent,
    AddCommentComponent
  ]
})
export class MoviesModule { }