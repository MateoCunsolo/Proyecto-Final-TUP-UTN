import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [], // SERVICIOS EXTERNOS QUE SE PUEDEN CONSUMIR DESDE NUESTRA APP
  bootstrap: [AppComponent] // COMPONENTE PRINCIPAL
})
export class AppModule { 

  

}
