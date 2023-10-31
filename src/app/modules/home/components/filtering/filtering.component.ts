import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})

export class FilteringComponent implements OnInit {

  @ViewChild('genreHeader', { static: true }) genreHeader: ElementRef;

  constructor(private filterService: FilteringService) { 
    this.genreHeader = new ElementRef(null);

  }

  title: string = 'Genre';

  ngOnInit(): void {
  }

  selectedGenre: string | null = "";
  idGenre: number = 0;
  headerBackgroundColor: string = '';

  onGenreClick(genre: string) {

    if (this.selectedGenre === genre) //si el usuario hace clic en el mismo género la segunda vez 
    {
      this.selectedGenre = null; // Elimina el filtrado si es el mismo género
      this.idGenre = 0;
      this.headerBackgroundColor = ''; //el boton vuelve a negro
      this.title = 'Genre';
      this.filterService.emitEvent({ idgenre: this.idGenre }); //se le manda un id genero de peli que no existe

    } else {
      this.title = genre;
      this.selectedGenre = genre; // Establece el nuevo género seleccionado

      if (genre === 'Romance') {
        this.headerBackgroundColor = 'red'; // Cambiar a rojo cuando se selecciona Romance
        this.idGenre = 10749;
      } else if (genre === 'Horror') {
        this.headerBackgroundColor = 'purple'; // Cambiar a morado cuando se selecciona Horror
        this.idGenre = 27;
      }else if (genre === 'Comedy') {
        this.headerBackgroundColor = 'yellow';
        this.idGenre = 35;
      }else if (genre === 'Sci-Fi') {
        this.headerBackgroundColor = 'blue';
        this.idGenre = 878;
      }else if (genre === 'Action') {
        this.headerBackgroundColor = 'lightblue';
        this.idGenre = 28;
      }else if (genre === 'Drama') {
        this.headerBackgroundColor = 'orange';
        this.idGenre = 18;
      }else if (genre === 'Thriller') {
        this.headerBackgroundColor = 'grey';
        this.idGenre = 53;
      }
  
      this.filterService.emitEvent({ idgenre: this.idGenre });
    }
  
  }
}


