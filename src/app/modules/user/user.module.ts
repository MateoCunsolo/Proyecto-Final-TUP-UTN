import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ListComponent } from './components/list/list.component';
import { MoviesModule } from '../movies/movies.module';



@NgModule({
  declarations: [
    ChangeNameComponent,
    ChangePassComponent,
    ChangeEmailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MoviesModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
