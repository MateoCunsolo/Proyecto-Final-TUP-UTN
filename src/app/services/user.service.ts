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

  public async addMovieToList(userId: number, listPosChoosen: number, movieId: number) 
  {
    console.log('1  ' + movieId);
    try {
      console.log('2  ' + movieId);
      // Primero, obtén el usuario desde el servidor
      const user = await fetch(`${this.url}/${userId}`).then((response) =>
        response.json()
      );
      console.log('3  ' + movieId);
      // Agrega el movieId a la lista específica
      console.log(user.lists[listPosChoosen].idMovies);
      console.log('4  ' + movieId);

      let movieAlreadyInList = false;
      
      for (let i = 0; i < user.lists[listPosChoosen].idMovies.length; i++) 
      {
        
        if (user.lists[listPosChoosen].idMovies[i] == movieId) 
        {
          console.log('5  ' + movieId);
          alert('La pelicula ya esta en la lista');
          //console.log('La pelicula ya se encuentra en la lista'); 
          movieAlreadyInList = true;
          break;
        }
      }

      if (!movieAlreadyInList) 
      {
        user.lists[listPosChoosen].idMovies.push(movieId);
        await fetch(`${this.url}/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' },
        });
        alert('pelicula agregada exitosamente')
        //console.log('pelicula agregada con exito')
      }
    }
    catch (error) 
    {
      console.log(error);
    }
    
   
  }
}

