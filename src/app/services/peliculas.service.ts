import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieData } from '../core/movie.interface';
import { Observable } from 'rxjs';
import { Genre } from '../core/movie.interface';
import { Subject } from 'rxjs';

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

  listMoviesByGenre(page: number, genre: number): Promise<MovieData> {
    return new Promise<MovieData>((resolve, reject) => {
      this.http
        .get<MovieData>(
          `${this.apiUrl}/discover/movie?api_key=79f8e563e8d26768e3277cdf102fd1b1&with_genres=${genre}&page=${page}`
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
}
