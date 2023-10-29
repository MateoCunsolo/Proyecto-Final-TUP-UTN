import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../core/Interfaces';
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

      this.router.navigate(['home'])
    } catch (error) {
      console.log(error);
    }
  }
 

}

