import { Component, OnInit } from '@angular/core';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router'; // Importa el módulo Router
import { eventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './movies-all.component.html',
  styleUrls: ['./movies-all.component.css'],
})
export class MoviesAllComponent implements OnInit {
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
  searchLoadMore : boolean = false;
  listClicked : boolean = false;

  constructor(
    private moviesService: PeliculasService,
    private router: Router,
    private eventsService: eventsService
  ) { }

  ngOnInit() {
    this.movies = [];
    if (this.router.url === '/home' && this.searchLoadMore === false) {
      this.movies = [];
      this.page = 1;
      this.loadMovies();
    } else if(this.searchLoadMore === true) {
      this.movies = [];
      this.valueSearch = this.router.url.split('=')[1];
      this.page = 1;
      this.loadMoviesFromSearch(this.valueSearch);
      this.searchLoadMore = true;
      this.router.navigate(['/home']);
    }
    
    this.eventsService.getEvent('listClicked').subscribe((event) => {
      this.listClicked = true;
      alert("entro en el listClicked")
      this.movies = this.loadMoviesForID(event.data.idMovies);
    });


    this.eventsService.getEvent('filterGenre').subscribe((event) => {
      this.selectedGenre = event.data.idgenre;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByGenre();
      this.eventsService.emitEvent('cross', { search: 'cross' });
    });

    this.eventsService.getEvent('filterRating').subscribe((event) => {
      this.selectedRating = event.data.rating;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByRating();
      this.eventsService.emitEvent('cross', { search: 'cross' });

    });

    this.eventsService.getEvent('filterYear').subscribe((event) => {
      console.log(event);
      this.startYear = event.data.startY;
      this.endYear = event.data.endY;
      this.selectedYear = event.data.startY;
      this.movies = [];
      this.page = 1;
      this.loadMoviesByRangeYear();
      this.eventsService.emitEvent('cross', { search: 'cross' });

    });

    this.eventsService.getEvent('search').subscribe((event) => {
      this.movies = [];
      this.selectedGenre = 0; 
      this.selectedRating = ''; 
      this.selectedYear = 0; 
      this.endYear = 0;
      this.startYear = 0;
      const searchValue = event.data.search;
      if (
        searchValue === 'remove'
      ) {
        this.page = 1;
        this.searchLoadMore = false;
        this.loadMovies();
      } else {
        this.searchLoadMore = true;
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
    alert("entro en el loadNextPage")

    if (this.selectedGenre != 0) {
      this.page++;
      this.loadMoviesByGenre();
      alert("entro en el loadGenre")
    } else if (this.selectedRating != '') {
      this.page++;
      this.loadMoviesByRating();
      alert("entro en el raitng")
    } else if (this.selectedYear != 0) {
    
      this.page++;
      this.loadMoviesByRangeYear();
      alert("entro en el year")
    } else if (this.searchLoadMore) {
      this.page++;
      this.loadMoviesFromSearch(this.valueSearch);
      alert("entro en el valuesearch")
    } else if(this.listClicked == false){
      this.page++;
      alert("entro en el home normal")
      this.loadMovies();
    }
  }

  redirectToMovieDetail(movieClicked: Movie) {
    sessionStorage.setItem('movieClicked', JSON.stringify(movieClicked));
    this.router.navigate(['home/movie/' + movieClicked.id]);
  }

  loadMoviesForID(idMovies: number[]) : Movie[]   
  {
    let movies : Movie[] = [];
    
    idMovies.forEach((id) => {
      this.moviesService.getMovieDetails(id).subscribe(
        (data: Movie) => {
          movies.push(data);
        },
        (error) => {
          console.error('Error fetching data by id:', error);
        }
      );
    });
  return movies;
  }
}