import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})

export class FilteringComponent implements OnInit {


  constructor(private filterService: FilteringService) { }

  titleG: string = 'Genre';
  titleR: string = 'Rating';

  ngOnInit(): void {
    
  }

  selectedGenre: string | null = "";
  idGenre: number = 0;
  headerBackgroundColor: string = '';

  RatingBackgroundColor: string = '';
  selectedRating: string = '';

  onGenreClick(genre: string) {

    if (this.selectedGenre === genre) //si el usuario hace clic en el mismo género la segunda vez 
    {
      this.selectedGenre = null; // Elimina el filtrado si es el mismo género
      this.idGenre = 0;
      this.headerBackgroundColor = ''; //el boton vuelve a negro
      this.titleG = 'Genre';
      this.emitFilterGenreEvent(this.idGenre);
      //se le manda un id genero de peli que no existe

    } else 
    {
      this.titleG = genre;
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
  
      this.emitFilterGenreEvent(this.idGenre);
    }
  
  }

  onRatingClick(rating: string) {

    if(this.titleR === rating) //si apreto por segunda vez 
    {
      this.titleR = 'Rating';
      this.RatingBackgroundColor = '';
      this.selectedRating = '';

      this.emitFilterRatingEvent(this.selectedRating);

    }else
    {
      this.titleR = rating;
      this.RatingBackgroundColor = 'var(--color-azul-claro)';

      if(rating === 'Highest First')
      {
        console.log("entro");
        this.selectedRating = 'desc';
        this.emitFilterRatingEvent(this.selectedRating);


      }else if(rating === 'Lowest First')
      {
        this.selectedRating = 'asc';
        console.log("selectedRating" + this.selectedRating);
        this.emitFilterRatingEvent(this.selectedRating);
      }
      

    }
    
  }

  emitFilterRatingEvent(rating: string) {
    this.filterService.emitEvent('filterRating', { rating: rating });
  }

  emitFilterGenreEvent(idgenre: number) {
    this.filterService.emitEvent('filterGenre', { idgenre: idgenre });
  }
}


