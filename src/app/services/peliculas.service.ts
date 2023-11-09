import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieData } from '../core/movie.interface';
import { Observable, catchError, map } from 'rxjs';
import { Genre } from '../core/movie.interface';
import { Subject } from 'rxjs';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private eventSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  
  emitEvent(event: any) {
    this.eventSubject.next(event);
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }

  /*{this.apiUrl}/movie/762430?api_key=79f8e563e8d26768e3277cdf102fd1b1*/

  listMovies(page: number): Promise<MovieData> {
    return new Promise<MovieData>((resolve, reject) => {
      this.http
        .get<MovieData>(
          `${this.apiUrl}/movie/now_playing?api_key=79f8e563e8d26768e3277cdf102fd1b1&page=${page}`
        ) 
        .toPromise()
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            reject('Data is undefined');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  listMoviesByGenre(page: number, genre: number): Observable<MovieData> {
    return this.http.get<MovieData>(
      `${this.apiUrl}/discover/movie?api_key=79f8e563e8d26768e3277cdf102fd1b1&with_genres=${genre}&page=${page}`
    ).pipe(
      map((data: MovieData) => data), // Transforma la respuesta
      catchError((error) => {
        console.error('Error fetching data:', error);
        return [];
      })
    );
  }


  listMoviesByRating(page: number, sortBy: string): Observable<MovieData> {
    const sortDirection = sortBy === 'asc' ? 'asc' : 'desc';

    return this.http
      .get<MovieData>(
        `${this.apiUrl}/discover/movie?api_key=79f8e563e8d26768e3277cdf102fd1b1&page=${page}&sort_by=vote_average.${sortDirection}`
      ).pipe(
        catchError((error) => {
          console.error('Error fetching data by rating:', error);
          return [];
        })
      );
  }

  listMoviesByRangeYear(page: number, startYear: number, endYear: number): Observable<MovieData> {
    // Construye la URL con el filtro por rango de años
    const apiUrl = `${this.apiUrl}/discover/movie?api_key=79f8e563e8d26768e3277cdf102fd1b1&page=${page}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  
    return this.http
      .get<MovieData>(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching data by rating:', error);
          return [];
        })
      );
  }
  
  
  listMoviesFromSearch(query: string, page: number): Observable<MovieData> {
    const apiUrl = `${this.apiUrl}/search/movie?api_key=79f8e563e8d26768e3277cdf102fd1b1&query=${encodeURIComponent(query)}&page=${page}`;  
    return this.http
      .get<MovieData>(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching data by query:', error);
          return [];
        })
      );
  }
  
  
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=79f8e563e8d26768e3277cdf102fd1b1`;
    return this.http.get(url);
  }



}
