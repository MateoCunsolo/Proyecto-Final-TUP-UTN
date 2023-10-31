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


  constructor(private moviesService: PeliculasService, private router: Router, private filterService: FilteringService) {
  }

  ngOnInit() {
    this.loadMovies();

    this.filterService.getEvent().subscribe((event) => {
      this.selectedGenre = event.idgenre;
      console.log(this.selectedGenre);
      this.movies = [];
      this.loadMoviesByGenre();
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

  loadNextPage() {
    if(this.selectedGenre == 0)
    {
      this.page++;
      this.loadMovies();

    }else
    {
      this.page++;
      this.loadMoviesByGenre();
    }
  }

  redirectToMovieDetail(movieId: number) {
    this.router.navigate(['home/movie/' + movieId]);

  }
}
