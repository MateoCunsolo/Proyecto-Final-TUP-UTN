import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap/carousel/carousel.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    AuthModule,
    SharedModule,
    NgbModule
  ]
})
export class LandingModule { }
