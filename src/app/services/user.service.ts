import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IComment, IList, IUser } from '../core/Interfaces';
import { Observable, from } from 'rxjs';
import { User } from '../core/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://api-rest-postgresql-5tis.onrender.com/users';
  flag: boolean = false;

  constructor(private router: Router) {}  

  getUsers(): Observable<IUser[]> {
    return from(fetch(this.url).then((response) => response.json()));
  }
  
  getOneUser(userId: number): Observable<IUser> {
    return from(fetch(`${this.url}/${userId}`).then((response) => response.json()));
  }

  getListsNamesForID(id: number): Observable<any> {
    return from(fetch(`${this.url}/list/${id}`).then((response) => response.json()));
  }

  getPassword(id: number): Observable<string> {
    return from(fetch(`${this.url}/admin/${id}`).then((response) => response.json()));
  }


  checkIfUsernameExists(username: string): Observable<boolean> {
    return from(
      fetch(this.url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((users: IUser[]) => users.some(user => user.userName === username))
    );
  }
  
  isUsuarioAutenticado()
  {
    if(this.getUserSessionStorage())
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    return from(
      fetch(this.url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((users: IUser[]) => users.some(user => user.email === email))
    );
  }
  
  
  public async postUser(user: IUser) {
    try {

      const body = JSON.stringify({userName: user.userName, email: user.email, password: user.password, lists: user.lists, comments: user.comments})
      await fetch(this.url, {
        method: 'POST',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
      console.log("ESTE ES EL USUARIO POST " + body)
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['signin']);
  }

  public async addCommentToUser(userId: number, comment: IComment) {
    try {
          let body = JSON.stringify({idUser: userId, text: comment.text, idMovie: comment.idMovie});
         await fetch(`${this.url}/comments/${comment.idMovie}/${userId}`, {
            method: 'POST',
            body: body,
            headers: { 'Content-type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in addCommentToUser:", error);
    }
}


  public async deleteList(id: number, list: string) {
    try {
      const body = JSON.stringify({id: id, list: list});
      await fetch(`${this.url}/${id}/${list}`, {
        method: 'DELETE',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async addMovieToList(id: number, list: string, idMovie: number) { 
    try {
      const body = JSON.stringify({id: id, list: list, idMovie: idMovie});
      alert(body);
  
      await fetch(`${this.url}/${id}/${list}/${idMovie}`, {
        method: 'POST',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteMovieFromList(id: number, list: string, idMovie: number) {
    try {
      const body = JSON.stringify({id: id, list: list, idMovie: idMovie});  
      await fetch(`${this.url}/${id}/${list}/${idMovie}`, {
        method: 'DELETE',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  public async getUserName(id: number): Promise<any> {
    try {
      const user = await fetch(`${this.url}/${id}/All`).then((response) => response.json());
      console.log(user)
      return user;
    } catch (error) {
      console.log(error);
    }
    return "";
  }

  public async deleteListComplete(userId: number, listPosChoosen: number) {
    try {
      // Primero, obtengo el usuario desde el servidor
      const user = await fetch(`${this.url}/${userId}`).then((response) => response.json());
  
      // Verifico si la lista existe en la posición especificada
      if (user.lists[listPosChoosen]) {
        // Elimino la lista de películas completa
        user.lists.splice(listPosChoosen, 1);
  
        // Actualizo la información del usuario en el servidor
        await fetch(`${this.url}/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' },
        });
  
        alert('List successfully removed.');
      } else {
        // Si la lista no existe, muestro un mensaje de error
        alert('The selected list does not exist.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async checkIfUsernameAvailable(username: string): Promise<boolean> {
    try {
      const users = await fetch(this.url).then((response) => response.json());
      const existingUser = users.find((user: { username: string }) => user.username === username);
      console.log("El usuario existe? " + existingUser);
      return !!existingUser; // Ahora negamos el resultado aquí
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  public async changeUsername(id: number, newUsername: string){
    try {
      const body = JSON.stringify({id: id, newUsername: newUsername});
      await fetch(`${this.url}/${id}/name/${newUsername}`, {
        method: 'PATCH',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(id: number, newPassword: string){
    try {
      const body = JSON.stringify({ newPassword: newPassword });
      await fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
}


  async changeEmail(id: number, newEmail: string){
    try {
      const body = JSON.stringify({id: id, newEmail: newEmail});
      await fetch(`${this.url}/${id}/${newEmail}`, {
        method: 'PATCH',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  deleteUser(id: number): Observable<IUser> {
    const userUrl = `${this.url}/${id}`;
    return from(fetch(userUrl, { method: 'DELETE' }).then((response) => response.json()));
  }

   setUserSessionStorage(user: IUser) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserSessionStorage(): IUser | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  getMoviesForList(userId:Number,nameList:String): Observable<Number> {
    return from(fetch(`${this.url}/list/${userId}/${nameList}`).then((response) => response.json()));
  }

  public async createNewList(id: number, list: string){
    try {
      const body = JSON.stringify({id: id, list: list});
      await fetch(`${this.url}/${id}/${list}`, {
        method: 'POST',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateNameList(id: number, list: string, newName: string){
    try {
      const body = JSON.stringify({id: id, list: list, newName: newName});
      await fetch(`${this.url}/${id}/${list}/${newName}`, {
        method: 'PATCH',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  getUsernameAvailability(username: string): Observable<boolean> {
    return from(fetch(this.url)
      .then((response) => response.json())
      .then((users: IUser[]) => !users.find((user) => user.userName === username)));
  }

  getEmailAvailability(email: string): Observable<boolean> {
    return from(fetch(this.url)
      .then((response) => response.json())
      .then((users: IUser[]) => !users.find((user) => user.email === email)));
  }

  
  changeListName(userId: number, newListName: string, listIndex: number): Observable<IUser> {
    const userUrl = `${this.url}/${userId}`;
    return from(
      fetch(userUrl)
        .then((response) => response.json())
        .then((user: IUser) => {
          // Crear una copia de la lista actual del usuario
          const updatedLists = [...user.lists];
          // Actualizar el nombre de la lista en la copia
          updatedLists[listIndex] = { ...updatedLists[listIndex], name: newListName };
          // Crear un nuevo objeto de usuario con la lista actualizada
          const updatedUser = { ...user, lists: updatedLists };
          
          // Enviar una solicitud PATCH al servidor con el usuario actualizado
          return fetch(userUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          }).then((response) => response.json());
        })
    );
  }


  async getCommentsForMovie(movieId: number){
    return from(fetch(`${this.url}/comments/${movieId}`).then((response) => response.json()));
  }



  }
  



