import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieData } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculadetalle',
  templateUrl: './peliculadetalle.component.html',
  styleUrls: ['./peliculadetalle.component.css']
})
export class PeliculaDetalleComponent implements OnInit {
  movieId: number = 0;
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

  constructor(
    private route: ActivatedRoute,
    private moviesService: PeliculasService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieDetails();
    });
  }

  loadMovieDetails() {
    this.moviesService.getMovieDetails(this.movieId)
      .subscribe((movie: Movie) => {
        this.movie = movie;
      }, error => {
        console.error('Error fetching movie details:', error);
      });
  }
}
