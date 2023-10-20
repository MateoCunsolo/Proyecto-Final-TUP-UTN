import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    AuthModule
  ]
})
export class LandingModule { }
