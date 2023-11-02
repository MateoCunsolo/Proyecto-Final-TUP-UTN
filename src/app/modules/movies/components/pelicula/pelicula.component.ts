import { Component, OnInit } from '@angular/core';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router'; // Importa el módulo Router
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  private page = 1;
  public movies: Movie[] = [];

  selectedGenre: number = 0; // Propiedad para almacenar el nombre del género
  selectedRating: string = ''; // Propiedad para almacenar el rating seleccionado


  constructor(private moviesService: PeliculasService, private router: Router, private filterService: FilteringService) {
  }

  ngOnInit() {
    this.loadMovies();

    this.filterService.getEvent('filterGenre').subscribe((event) => {
      console.log(event);
      this.selectedGenre = event.data.idgenre;
      console.log(this.selectedGenre);
      this.movies = [];
      this.loadMoviesByGenre();
    });

    this.filterService.getEvent('filterRating').subscribe((event) => {
      this.selectedRating = event.data.rating;
      console.log("escuche el evento, recibi esto" + this.selectedRating);
      this.movies = [];
      this.loadMoviesByRating();
    });
  }
 
  loadMovies() {
    this.moviesService.listMovies(this.page)
      .then((data: MovieData) => {
        this.movies = this.movies.concat(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      
      });
  }

  loadMoviesByGenre() 
  {
    
    if (this.selectedGenre === 0) {
      // Cargar todas las películas sin filtrar por género
      this.movies = [];
      this.loadMovies();
    } else {

    this.moviesService.listMoviesByGenre(this.page, this.selectedGenre)
      .then((data: MovieData) => {
        this.movies = this.movies.concat(data.results);

      })
      .catch(error => {
        console.error('Error fetching data by genre:', error);
      });
    }
  }

  loadMoviesByRating() {
    console.log("Rating elegido" + this.selectedRating);
    if(this.selectedRating === '')
    {
      this.movies = [];
      this.loadMovies();
    }else
    {
      this.moviesService.listMoviesByRating(this.page, this.selectedRating)
      .then((data: MovieData) => {
        this.movies = this.movies.concat(data.results);
      })
      .catch(error => {
        console.error('Error fetching data by rating:', error);
      });

    }
    
  }

  loadNextPage() {
    if(this.selectedGenre != 0)
    {
      this.page++;
      this.loadMoviesByGenre();

    }else if(this.selectedRating != '')
    {
      this.page++;
      this.loadMoviesByRating();
    }else
    {
      this.page++;
      this.loadMovies();
    }
  }

  redirectToMovieDetail(movieId: number) {
    this.router.navigate(['home/movie/' + movieId]);

  }
}
