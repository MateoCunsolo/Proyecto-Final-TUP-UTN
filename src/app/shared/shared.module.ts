import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarListComponent } from './components/nav-bar-list/nav-bar-list.component';
import { NavBarUserComponent } from './components/nav-bar-user/nav-bar-user.component';
import { InputSearchComponent } from './components/input-search/input-search.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavBarListComponent,
    NavBarUserComponent,
    InputSearchComponent    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    NavBarListComponent,
    NavBarUserComponent,
    InputSearchComponent
  ]
})

export class SharedModule { }
