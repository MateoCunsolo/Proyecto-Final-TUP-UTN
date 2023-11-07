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
    
    try {
      // Primero, obtengo el usuario desde el servidor
      const user = await fetch(`${this.url}/${userId}`).then((response) =>
        response.json()
      );

      // Agrego el movieId a la lista específica
      console.log(user.lists[listPosChoosen].idMovies);

      let movieAlreadyInList = false;
      
      for (let i = 0; i < user.lists[listPosChoosen].idMovies.length; i++) 
      {
        
        if (user.lists[listPosChoosen].idMovies[i] == movieId) 
        {
          alert('The movie is already on the list ' + user.lists[listPosChoosen].name);
      
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

        alert('Movie successfully added to the list ' + user.lists[listPosChoosen].name)
      }
    }
    catch (error) 
    {
      console.log(error);
    }
   
  }


  public async checkIfUsernameAvailable(username: string): Promise<boolean> {
    try {
      const users = await fetch(this.url).then((response) => response.json());
      const existingUser = users.find((user: { username: string; }) => user.username === username);
      return !existingUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async checkIfEmailAvailable(email: string): Promise<boolean> {
    try {
      const users = await fetch(this.url).then((response) => response.json());
      const existingUser = users.find((user: { email: string; }) => user.email === email);
      return !existingUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  changeUsername(userId: number, newUsername: string): Observable<IUser> {
    const userUrl = `${this.url}/${userId}`;
    return from(fetch(userUrl)
      .then((response) => response.json())
      .then((user: IUser) => {
        const updatedUser = { ...user, userName: newUsername }; // Crear un nuevo objeto con el nombre de usuario actualizado
        return fetch(userUrl, {
          method: 'PATCH', // Usar una solicitud PATCH en lugar de PUT
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: newUsername }), // Enviar solo el campo actualizado
        }).then((response) => response.json());
      }));
  }
  
  deleteUser(userId: number): Observable<IUser> {
    const userUrl = `${this.url}/${userId}`;
    return from(fetch(userUrl, { method: 'DELETE' }).then((response) => response.json()));
  }
  

}

