import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsComponent } from './components/comments/comments.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { AddlistComponent } from './components/addMovieToList/addlist.component';
import { MovieDetailComponent} from './components/movie-detail/movies-detail.component';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';
import { MoviesAllComponent } from './components/movies-all/movies-all.component';
import { MovieWatchedComponent } from './components/movie-watched/movie-watched.component';


@NgModule({
  declarations: [
    MovieDetailComponent,
    CommentsComponent,
    AddCommentComponent,
    AddlistComponent,
    DeleteMovieComponent,
    MoviesAllComponent,
    MovieWatchedComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    MovieDetailComponent,
    CommentsComponent,
    AddCommentComponent,
    MoviesAllComponent
  ]
})
export class MoviesModule { }