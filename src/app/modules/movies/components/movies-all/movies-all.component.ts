import { Component, OnInit } from '@angular/core';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa el módulo Router
import { eventsService } from 'src/app/services/events.service';
import { Observable, forkJoin, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
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
    genres: undefined
  };

  selectedGenre: number = 0; // Propiedad para almacenar el nombre del género
  selectedRating: string = ''; // Propiedad para almacenar el rating seleccionado
  selectedYear: number = 0; // Propiedad para almacenar el año seleccionado
  endYear: number = 0;
  startYear: number = 0;
  valueSearch: string = '';
  searchLoadMore: boolean = false;
  listClicked: boolean = false;
  messageLoad: string = '';
  constructor(
    private moviesService: PeliculasService,
    private router: Router,
    private route: ActivatedRoute, // Inject the ActivatedRoute module
    private eventsService: eventsService,
    private userService: UserService

  ) {}

  ngOnInit() {
    
    this.movies = [];
    this.messageLoad = 'Loadding movies...';
    if (this.router.url.includes('list'))
    {  
      if(this.movies.length == 0){
        this.messageLoad = "Hey! No movies on your list yet. Let's fix that—time to add some films!";
      }
    }
    


    if (this.router.url === '/home' && this.searchLoadMore === false) {
      this.movies = [];
      this.page = 1;
      this.loadMovies();
    } else if (this.router.url.includes('search')) {
      this.movies = [];
      this.page = 1;
      this.searchLoadMore = true;
      this.valueSearch = this.router.url.split('=')[1].replace(/%20/g, ' ');
      this.loadMoviesFromSearch(this.valueSearch);
      this.router.navigate(['home']);
    }

    this.showMoviesByIdList();

    this.eventsService.getEvent('movieDeleted').subscribe((event) => {
      this.showMoviesByIdList();

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
      if (searchValue === 'remove') {
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

  showMoviesByIdList(){
     // Comprobamos si la URL incluye 'list', lo que indica que estamos en la vista de lista
     this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path === 'list')) {
           // Obtenemos el objeto 'listClicked' de sessionStorage y lo almacenamos en la variable 'list'
           let user = this.userService.getUserSessionStorage();
           if(user != null){
             let list = user.lists.find(list => list.name === this.router.url.split('/')[3]);
             console.log(list);
             this.movies = []; // Reiniciamos la lista de películas
             this.page = 1;
             this.listClicked = true;
             // Llamamos a la función 'loadMoviesForID' pasando el array de IDs de películas de 'list.idMovies'
             // Usamos 'subscribe' para manejar las películas una vez que todas las solicitudes se completen
             if(list != undefined){
             this.loadMoviesForID(list.idMovies).subscribe((movies) => {
               this.movies = movies; // Almacena las películas recuperadas en 'this.movies'
             });}
           }
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
    alert('entro en el loadNextPage');

    if (this.selectedGenre != 0) {
      this.page++;
      this.loadMoviesByGenre();
      alert('entro en el loadGenre');
    } else if (this.selectedRating != '') {
      this.page++;
      this.loadMoviesByRating();
      alert('entro en el raitng');
    } else if (this.selectedYear != 0) {
      this.page++;
      this.loadMoviesByRangeYear();
      alert('entro en el year');
    } else if (this.searchLoadMore) {
      this.page++;
      this.loadMoviesFromSearch(this.valueSearch);
      alert('entro en el valuesearch');
    } else if (this.listClicked == false) {
      this.page++;
      alert('entro en el home normal');
      this.loadMovies();
    }
  }

  redirectToMovieDetail(movieClicked: Movie) {
    sessionStorage.setItem('id', JSON.stringify(movieClicked.id));
    this.router.navigate(['home/movie/' + movieClicked.id]);
  }

  sendMovie(movieClicked: Movie) {
    sessionStorage.setItem('id', JSON.stringify(movieClicked.id));
  }

  // Función que carga películas por sus IDs
  loadMoviesForID(idMovies: number[] | undefined): Observable<Movie[]> {
    // Comprobamos si 'idMovies' es 'undefined'
    if (!idMovies) {
      return of([]); // Retornamos un Observable vacío si 'idMovies' no está definido
    }
    // Creamos un array de observables para obtener detalles de películas por sus IDs
    const observables = idMovies.map((id) =>
      this.moviesService.getMovieDetails(id)
    );
    // Utilizamos 'forkJoin' para esperar a que todas las solicitudes se completen
    return forkJoin(observables);
  }
}
