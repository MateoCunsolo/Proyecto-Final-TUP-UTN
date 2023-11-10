import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movies-detail.component';
import { ListComponent } from '../user/components/list/list.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent
  },
  { 
    path: 'movie/:id', 
    component: MovieDetailComponent
  },

  {
    path: 'list/:name',
    component: ListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }