import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css'],
})
export class NavBarUserComponent implements OnInit {
  user: IUser | null = null;
  isMenuOpen = false;
  confirmLogOut: boolean = false;
  message: string = '';
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
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
          this.showAlert(1);
      break;
    default:
      this.router.navigate(['home']); // Redirige a una ruta por defecto en caso de que el número no coincida con ninguno de los casos anteriores
  }
}

  showAlert(num: number) {
    let body: HTMLElement | null =
        document.querySelector('#cont-filter-blur');
      let listFilter: HTMLElement | null =
        document.querySelector('#filter-blur');
      let searchFilter: HTMLElement | null =
        document.querySelector('#filter-blur2');
      this.confirmLogOut = !this.confirmLogOut;
      if (this.confirmLogOut == true) {
        if (
          body instanceof HTMLElement &&
          listFilter instanceof HTMLElement &&
          searchFilter instanceof HTMLElement
        ) {
          listFilter.style.filter = 'blur(5px)';
          body.style.filter = 'blur(5px)';
          searchFilter.style.filter = 'blur(5px)';
          let alert: HTMLElement | null =
            document.querySelector('#logout-account');
          if (alert instanceof HTMLElement) {
            alert.style.display = 'block';
          }
        }
      } else {
        if (
          body instanceof HTMLElement &&
          listFilter instanceof HTMLElement &&
          searchFilter instanceof HTMLElement
        ) {
          listFilter.style.filter = 'blur(0px)';
          body.style.filter = 'blur(0px)';
          searchFilter.style.filter = 'blur(0px)';
        }
      }
      if (this.isMenuOpen == true) {
        this.toggleMenu();
      }
    if ((num == 1)) {
        this.message = 'delete your account 😥'
    } else {
      this.message = 'leave'
      
    }
  }

  logout() {
    this.router.navigate(['']);
    if(this.message == 'delete your account 😥' && this.user?.id){
        this.userService.deleteUser(this.user.id).subscribe(() => {
          sessionStorage.clear();
        });
    } else {
      sessionStorage.clear();
    }
  }
 

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}