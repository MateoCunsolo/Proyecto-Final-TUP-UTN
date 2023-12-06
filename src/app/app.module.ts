import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, // Añade el módulo NgbModule
  ],
  providers: [], // SERVICIOS EXTERNOS QUE SE PUEDEN CONSUMIR DESDE NUESTRA APP
  bootstrap: [AppComponent] // COMPONENTE PRINCIPAL
})
export class AppModule {}
