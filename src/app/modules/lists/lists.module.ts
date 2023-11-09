import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListsRoutingModule } from './lists-routing.module';
import { ListComponent } from './components/list/list.component';
import { MoviesModule } from '../movies/movies.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MoviesModule,
    ListsRoutingModule
  ]
})

export class ListsModule { }
