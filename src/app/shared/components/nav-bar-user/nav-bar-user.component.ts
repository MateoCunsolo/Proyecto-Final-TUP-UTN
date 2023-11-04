import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})

export class NavBarUserComponent implements OnInit {

  user: IUser | null = null;
  isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      console.log(this.user);
    }

  
  }


  doSomething() {
    // Agrega la lógica que desees aquí al hacer clic en las opciones del menú.
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
    


