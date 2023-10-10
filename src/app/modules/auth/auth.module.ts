import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
//componentes
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
