import { Component, OnInit } from '@angular/core';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router'; // Importa el módulo Router

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  private page = 1;
  public movies: Movie[] = [];

  constructor(private moviesService: PeliculasService, private router: Router) {
  }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.listMovies(this.page)
      .then((data: MovieData) => {
        this.movies = this.movies.concat(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Manejar errores aquí
      });
  }

  loadNextPage() {
    this.page++;
    this.loadMovies();
  }

  redirectToMovieDetail(movieId: number) {
    this.router.navigate(['/movie-detail/' + movieId]);
  }
}
