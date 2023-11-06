import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})

export class FilteringComponent implements OnInit {

  constructor(private filterService: FilteringService) { }

  ngOnInit(): void {}

  titleG: string = 'Genre';
  titleR: string = 'Rating';
  titleY: string  = 'Year';

  activeFilter: 'genre' | 'rating' | 'year' | '' = '';

  selectedGenre: string | null = "";
  idGenre: number = 0;
  headerBackgroundColor: string = '';

  RatingBackgroundColor: string = '';
  selectedRating: string = '';

  selectedYear: number = 0;
  yearBackgroundColor: string = '';
  endYear: number = 0;
  startYear: number = 0;
  
  onGenreClick(genre: string) {

    this.filterService.getEvent('search').subscribe((event) => {
      this.selectedGenre = null;
      this.idGenre = 0;
      this.headerBackgroundColor = ''; 
      this.titleG = 'Genre';
    });

    if (this.selectedGenre === genre) //si el usuario hace clic en el mismo género la segunda vez 
    {
      this.selectedGenre = null; // Elimina el filtrado si es el mismo género
      this.idGenre = 0;
      this.headerBackgroundColor = ''; //el boton vuelve a negro
      this.titleG = 'Genre';
      this.emitFilterGenreEvent(this.idGenre);
      this.toggleFilter('');
      //se le manda un id genero de peli que no existe

    } else 
    {
      this.titleG = genre;
      this.selectedGenre = genre; // Establece el nuevo género seleccionado
      this.toggleFilter('genre');

      switch (genre) {
        case 'Romance':
          this.headerBackgroundColor = '#D11134'; 
          this.idGenre = 10749;
          break;
        case 'Horror':
          this.headerBackgroundColor = '#680286'; 
          this.idGenre = 27;
          break;
        case 'Comedy':
          this.headerBackgroundColor = '#C6AC00';
          this.idGenre = 35;
          break;
        case 'Sci-Fi':
          this.headerBackgroundColor = '#221476';
          this.idGenre = 878;
          break;
        case 'Action':
          this.headerBackgroundColor = '#2E7294';
          this.idGenre = 28;
          break;
        case 'Drama':
          this.headerBackgroundColor = '#BD5500';
          this.idGenre = 18;
          break;
        case 'Thriller':
          this.headerBackgroundColor = 'grey';
          this.idGenre = 53;
          break;
        default:
          // Código que se ejecutará si no se encuentra una coincidencia con ninguna de las opciones anteriores.
          break;
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
      this.toggleFilter('');

      this.emitFilterRatingEvent(this.selectedRating);

    }else
    {
      this.titleR = rating;
      this.RatingBackgroundColor = 'var(--color-azul-claro)';
      this.toggleFilter('rating');

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

  onYearClick(startY: number, endY: number) {

    if(this.selectedYear === startY) //si apreto por segunda vez 
    {
      this.selectedYear = 0;
      this.titleY = 'Year';
      this.yearBackgroundColor = '';
      this.toggleFilter('');

      this.emitFilterYearEvent(startY, endY);

    }else{
      this.titleY = startY.toString() + "-"+ endY.toString(); 
      this.yearBackgroundColor = 'var(--color-azul-claro)';
      this.selectedYear = startY;
      this.toggleFilter('year');

      switch (startY) {
        case 1860:
          this.startYear = 1860;
          this.endYear = 1909;
          break;
        case 1910:
          this.startYear = 1910;
          this.endYear = 1959;
          break;
        case 1960:
          this.startYear = 1960;
          this.endYear = 2009;
          break;
        case 2010:
          this.startYear = 2010;
          this.endYear = 2059;
          break;
        default:
          // Código que se ejecutará si no se encuentra una coincidencia con ninguna de las opciones anteriores.
          break;
      }

      this.emitFilterYearEvent(this.startYear, this.endYear);
      

    }

  }

  emitFilterRatingEvent(rating: string) {
    this.filterService.emitEvent('filterRating', { rating: rating });
  }

  emitFilterGenreEvent(idgenre: number) {
    this.filterService.emitEvent('filterGenre', { idgenre: idgenre });
  }

  emitFilterYearEvent(startY: number, endY: number) {
    this.filterService.emitEvent('filterYear', { startY: startY, endY: endY });
  }

  toggleFilter(filter: 'genre' | 'rating' | 'year' | '') {
    this.activeFilter = filter;
    if(filter == 'genre' || filter == '')
    {
      this.titleR = 'Rating';
      this.RatingBackgroundColor = '';
      this.selectedRating = '';

      this.titleY = 'Year';
      this.yearBackgroundColor = '';
      this.selectedYear = 0;

    } else if (filter === 'rating' || !filter) {
    
      this.titleG = 'Genre';
      this.headerBackgroundColor = '';
      this.selectedGenre = '';

      this.titleY = 'Year';
      this.yearBackgroundColor = '';
      this.selectedYear = 0;

    } else if (filter === 'year' || filter === '') {

      this.titleR = 'Rating';
      this.RatingBackgroundColor = '';
      this.selectedRating = '';

      this.titleG = 'Genre';
      this.headerBackgroundColor = '';
      this.selectedGenre = '';
    }
  }
}


