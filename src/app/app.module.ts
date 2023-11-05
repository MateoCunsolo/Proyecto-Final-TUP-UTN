import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Corrección en esta línea
  ],
  providers: [], // SERVICIOS EXTERNOS QUE SE PUEDEN CONSUMIR DESDE NUESTRA APP
  bootstrap: [AppComponent] // COMPONENTE PRINCIPAL
})
export class AppModule {}
