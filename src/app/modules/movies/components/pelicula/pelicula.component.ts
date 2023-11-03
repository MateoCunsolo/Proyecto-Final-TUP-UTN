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
  public defaultImageURL = 'assets/IMAGE NO DISPONIBLE.png';
  private page = 1;
  public movies: Movie[] = [];

  movie: Movie = {
    adult: false,
    backdrop_path: '', 
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  };

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

  loadMoviesByGenre() {
    if (this.selectedGenre === 0) {
      this.movies = [];
      this.loadMovies();
    } else {
      this.moviesService.listMoviesByGenre(this.page, this.selectedGenre)
        .subscribe((data: MovieData) => { // Cambiamos .then() por .subscribe()
          this.movies = this.movies.concat(data.results);
        }, error => {
          console.error('Error fetching data by genre:', error);
        });
    }
  }
  
  loadMoviesByRating() {
    console.log("Rating elegido" + this.selectedRating);
    if (this.selectedRating === '') {
      this.movies = [];
      this.loadMovies();
    } else {
      this.moviesService.listMoviesByRating(this.page, this.selectedRating)
        .subscribe((data: MovieData) => {
          this.movies = this.movies.concat(data.results);
        }, error => {
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

  redirectToMovieDetail(movieClicked: Movie) {
    sessionStorage.setItem('movieClicked', JSON.stringify(movieClicked));
    this.router.navigate(['home/movie/' + movieClicked.id]);
  }
  
}

