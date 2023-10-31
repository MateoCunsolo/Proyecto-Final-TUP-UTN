import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IComment, IUser } from '../core/Interfaces';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url='http://localhost:3000/users';

  constructor(private router: Router){}

  getUsers(): Observable<IUser[]>{
    return from(fetch(this.url).then(response => response.json()));

  }

 
  public async postUser(user: IUser){
    try {
      await fetch(this.url,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {'Content-type': 'application/json'}
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
        headers: {'Content-type': 'application/json'}
      });
    } catch (error) {
      console.log(error);
    }
  }

}

