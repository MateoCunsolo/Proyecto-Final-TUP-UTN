import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})

export class NavBarUserComponent implements OnInit {

  user: IUser | null = null;
  isMenuOpen = false;

  constructor(private router: Router) { }

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

  changeSomething(number: number) {

     switch (number) {
    case 1:
      this.router.navigate(['user/change-username']); // Redirige a la ruta1
      break;
    case 2:
      this.router.navigate(['user/change-pass']); // Redirige a la ruta2
      break;
    case 3:
      this.router.navigate(['user/change-email']); // Redirige a la ruta3
      break;
    case 4:
     
      break;
    default:
      this.router.navigate(['home']); // Redirige a una ruta por defecto en caso de que el número no coincida con ninguno de los casos anteriores
  }
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['landing']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
    


