import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = 'http://localhost:4200/users'

  constructor(private router: Router) { }

  async postUser(user : User){
    try{
      await fetch (this.url, 
                 {
                   method: 'POST',
                   body: JSON.stringify(user),
                   headers: {'Content.type':'application/json'}
                  }
        )
        this.router.navigate(['home'])
    } catch(error) {
      console.log(error);
    }
  }
}
