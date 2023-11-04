import { Component, OnInit } from '@angular/core';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router'; // Importa el módulo Router
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
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
    vote_count: 0,
  };

  selectedGenre: number = 0; // Propiedad para almacenar el nombre del género
  selectedRating: string = ''; // Propiedad para almacenar el rating seleccionado
  selectedYear: number = 0; // Propiedad para almacenar el año seleccionado
  endYear: number = 0;
  startYear: number = 0;
  valueSearch: string = '';

  constructor(
    private moviesService: PeliculasService,
    private router: Router,
    private filterService: FilteringService
  ) { }

  ngOnInit() {
    if (this.router.url === '/home') {
      this.movies = [];
      this.page = 1;
      this.loadMovies();
    } else {
      this.movies = [];
      this.valueSearch = this.router.url.split('=')[1];
      this.page = 1;
      this.loadMoviesFromSearch(this.valueSearch);
      this.router.navigate(['/home']);
    }

    this.filterService.getEvent('filterGenre').subscribe((event) => {
      this.selectedGenre = event.data.idgenre;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByGenre();
    });

    this.filterService.getEvent('filterRating').subscribe((event) => {
      this.selectedRating = event.data.rating;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByRating();
    });

    this.filterService.getEvent('filterYear').subscribe((event) => {
      console.log(event);
      this.startYear = event.data.startY;
      this.endYear = event.data.endY;
      this.selectedYear = event.data.startY;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByRangeYear();
    });

    this.filterService.getEvent('search').subscribe((event) => {
      this.movies = [];
      const searchValue = event.data.search;
      if (
        searchValue === 'remove' ||
        this.conteinWordsAndNonAlphanumeric(searchValue)
      ) {
        this.page = 1;
        this.loadMovies();
      } else {
        this.page = 1;
        this.loadMoviesFromSearch(searchValue);
        this.valueSearch = searchValue;
      }
    });
  }

  conteinWordsAndNonAlphanumeric(search: string): boolean {
    if (!/^[a-zA-Z0-9\s]*$/.test(search)) {
      return true;
    }

    return false;
  }

  loadMovies() {
    this.moviesService
      .listMovies(this.page)
      .then((data: MovieData) => {
        this.movies = this.movies.concat(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  loadMoviesFromSearch(search: string) {
    if (search === '') {
      this.movies = [];
      this.page = 1;
      this.loadMovies();
    } else {
      this.moviesService.listMoviesFromSearch(search, this.page).subscribe(
        (data: MovieData) => {
          this.verifyData(data);
        },
        (error) => {
          alert('No se encontraron resultados');
        }
      );
    }
  }

  loadMoviesByGenre() {
    if (this.selectedGenre === 0) {
      this.movies = [];
      this.loadMovies();
    } else {
      this.moviesService
        .listMoviesByGenre(this.page, this.selectedGenre)
        .subscribe(
          (data: MovieData) => {
            // Cambiamos .then() por .subscribe()
            this.verifyData(data);
          },
          (error) => {
            console.error('Error fetching data by genre:', error);
          }
        );
    }
  }

  loadMoviesByRating() {
    if (this.selectedRating === '') {
      this.movies = [];
      this.loadMovies();
    } else {
      this.moviesService
        .listMoviesByRating(this.page, this.selectedRating)
        .subscribe(
          (data: MovieData) => {
            this.verifyData(data);
          },
          (error) => {
            console.error('Error fetching data by rating:', error);
          }
        );
    }
  }

  loadMoviesByRangeYear() {
    if (this.startYear === 0 && this.endYear === 0) {
      this.movies = [];
      this.loadMovies();
    } else {
      this.moviesService
        .listMoviesByRangeYear(this.page, this.startYear, this.endYear)
        .subscribe(
          (data: MovieData) => {
            this.verifyData(data);
          },
          (error) => {
            console.error('Error fetching data by range year:', error);
          }
        );
    }
  }

  verifyData(data: MovieData) {
    if (data.results.length === 0) {
      alert('No se encontraron resultados');
    } else {
      this.movies = this.movies.concat(data.results);
    }
  }

  loadNextPage() {
    if (this.selectedGenre != 0) {
      this.page++;
      this.loadMoviesByGenre();
    } else if (this.selectedRating != '') {
      this.page++;
      this.loadMoviesByRating();
    } else if (this.selectedYear != 0) {
      this.page++;
      this.loadMoviesByRangeYear();
    } else if (this.valueSearch != '' || this.router.url != '/home') {
      this.page++;
      this.loadMoviesFromSearch(this.valueSearch);
    } else {
      this.page++;
      this.loadMovies();
    }
  }

  redirectToMovieDetail(movieClicked: Movie) {
    sessionStorage.setItem('movieClicked', JSON.stringify(movieClicked));
    this.router.navigate(['home/movie/' + movieClicked.id]);
  }
}
