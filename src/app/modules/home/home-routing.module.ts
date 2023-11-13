import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movies-detail.component';
import { ListComponent } from '../user/components/list/list.component';
import { AuthGuardGuard } from '../auth/guards/auth-guard.guard';

const routes: Routes = [

  {
    path:'',
    component: MainComponent, canActivate: [AuthGuardGuard] 
  },
  { 
    path: 'movie/:id', 
    component: MovieDetailComponent, canActivate: [AuthGuardGuard] 
  },

  {
    path: 'list/:name',
    component: ListComponent, canActivate: [AuthGuardGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }