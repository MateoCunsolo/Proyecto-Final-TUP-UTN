import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: 
  [
    FooterComponent,
    HeaderComponent
  ]
})

export class SharedModule { }
