import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IComment, IUser } from '../core/Interfaces';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/users';
  flag: boolean = false;

  constructor(private router: Router) {}

  getUsers(): Observable<IUser[]> {
    return from(fetch(this.url).then((response) => response.json()));
  }

  public async postUser(user: IUser) {
    try {
      await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' },
      });

      this.router.navigate(['signin']);
    } catch (error) {
      console.log(error);
    }
  }

  public async addCommentToUser(userId: number, comment: IComment) {
    try {
      const user = await fetch(`${this.url}/${userId}`).then((response) =>
        response.json()
      );
      user.comments.push(comment);
      await fetch(`${this.url}/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async addMovieToList(
    userId: number,
    listPosChoosen: number,
    movieId: number
  ) {
    try {
      // Primero, obtén el usuario desde el servidor
      const user = await fetch(`${this.url}/${userId}`).then((response) =>
        response.json()
      );

      // Agrega el movieId a la lista específica
      console.log(user.lists[listPosChoosen].idMovies);

      let movieAlreadyInList = false;
      
      for (let i = 0; i < user.lists[listPosChoosen].idMovies.length; i++) {
        if (user.lists[listPosChoosen].idMovies[i] == movieId) {
          console.log('La pelicula ya se encuentra en la lista'); //la idea es agregar un cartel
          movieAlreadyInList = true;
          break;
        }
      }

      if (!movieAlreadyInList) {
        user.lists[listPosChoosen].idMovies.push(movieId);
        await fetch(`${this.url}/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' },
        });
      }

    } catch (error) {
      console.log(error);
    }
  }
}
