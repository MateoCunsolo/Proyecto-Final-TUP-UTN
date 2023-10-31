import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IComment, IUser } from '../core/Interfaces';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = 'http://localhost:3000/users';
  flag: boolean = false;

  constructor(private router: Router) { }

  getUsers(): Observable<IUser[]> {
    return from(fetch(this.url).then(response => response.json()));

  }


  public async postUser(user: IUser) {
    try {
      await fetch(this.url,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' }
        })

      this.router.navigate(['signin']);
    } catch (error) {
      console.log(error);
    }
  }


  public async addCommentToUser(userId: number, comment: IComment) {
    try {
      const user = await fetch(`${this.url}/${userId}`).then(response => response.json());
      user.comments.push(comment);
      await fetch(`${this.url}/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async addMovieToList(userId: number, listId: number, movieId: number) {
    try {

      // Primero, obtén el usuario desde el servidor
      const user = await fetch(`${this.url}/${userId}`).then(response => response.json());

      // Agrega el movieId a la lista específica
      console.log(user.lists[listId].idMovies);
    
      for (let i = 0; i <= user.lists[listId].idMovies.length; i++ && this.flag == false) 
      {
        if(user.lists[listId].idMovies.length != 0)
        {
          if( user.lists[listId].idMovies[i] !== movieId) {

            user.lists[listId].idMovies.push(movieId);

            // Actualiza el usuario en el servidor
            await fetch(`${this.url}/${userId}`, {
              method: 'PATCH',
              body: JSON.stringify(user),
              headers: { 'Content-type': 'application/json' }
            });
          
            console.log("usuario con peli nueva en la lista:");
            this.flag = true; 

          }else
          {
            console.log("no funca");
          }

      }else{

        console.log("El arrelgo esta vacio");
        
        user.lists[listId].idMovies.push(movieId);

        // Actualiza el usuario en el servidor
        await fetch(`${this.url}/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' }
        });

      }
      }

    }
    catch (error) {
      console.log(error);
    }
  }


}

