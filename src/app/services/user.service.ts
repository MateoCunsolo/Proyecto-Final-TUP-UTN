import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../core/Interfaces';
import { Observable, from } from 'rxjs';
import { IComment, IList } from '../core/Interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://api-rest-postgresql-5tis.onrender.com/users';
  //private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient,private router: Router) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }
  
  getOneUser(userId: number): Observable<IUser> {
    return this.http.get<IUser>(this.url);
  }

  getListsNamesForID(id: number): Observable<any> {
    return this.http.get(`${this.url}/list/${id}`);
  }

   
  getMoviesForList(id:Number,list:String): Observable<any> {
    console.log("URL: " + `${this.url}/list/${id}/${list}`);
    return this.http.get(`${this.url}/list/${id}/${list}`);
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
        .then((users: IUser[]) => users.some(user => user.username === username))
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

      const body = JSON.stringify({userName: user.username, email: user.email, password: user.password, lists: user.lists, comments: user.comments})
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


  public async addCommentToUser(id: number, comment: IComment) {
    try {
          let body = JSON.stringify({text: comment.text, idMovie: comment.idMovie});
         await fetch(`${this.url}/${id}/AddComment`, {
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
      await fetch(`${this.url}/${id}/deleteList`, {
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
      console.log("ID: " + id + " LIST: " + list + " IDMOVIE: " + idMovie);
      const body = JSON.stringify({id: id, list: list, idMovie: idMovie});  
      await fetch(`${this.url}/${id}/${list}/${idMovie}`, {
        method: 'DELETE',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log("Error en deleteMovieFromList:", error);
    }
  }

  

  
  public async getUserName(id: number): Promise<any> {
    try {    
      const user = await this.http.get<IUser>(`${this.url}/${id}`).toPromise(); // Espera la respuesta de la solicitud HTTP
      return user;
    } catch (error) {
      console.log("Error en getUserName:", error); // Maneja el error adecuadamente
      throw error; // Puedes lanzar el error o manejarlo de otra manera
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
      const body = JSON.stringify({newUsername: newUsername});
      await fetch(`${this.url}/${id}/UpdateUserName`, {
        method: 'PUT',
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
      await fetch(`${this.url}/${id}/UpdatedUserPassword`, {
        method: 'PUT',
        body: body, 
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
}


  async changeEmail(id: number, newEmail: string){
    try {
      const body = JSON.stringify({newEmail: newEmail});
      await fetch(`${this.url}/${id}/UpdateUserEmail`, {
        method: 'PUT',
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

   setUserSessionStorage(id: number) {
    sessionStorage.setItem('user', JSON.stringify(id));
  }

  getUserSessionStorage(): IUser | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
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
      await fetch(`${this.url}/${id}/UpdateNameList`, {
        method: 'PUT',
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
      .then((users: IUser[]) => !users.find((user) => user.username === username)));
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
  



