import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  
  showDelete: boolean = false;
  showLogOut: boolean = false;

  constructor(private router: Router, private userService: UserService, private renderer: Renderer2,private el: ElementRef) {}

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

        //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
        this.renderer.listen('body' , 'click', (event: Event) => {
          if (!this.el.nativeElement.contains(event.target as Node)) {
            // Si el clic no está dentro del menú, cierra el menú
            this.isMenuOpen = false;
          }
        });
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
    case 4: //delete account
          this.showAlert(1);
      break;
    case 5: //logout
          this.showAlert(2);
      break;
    default:
      this.router.navigate(['home']); // Redirige a una ruta por defecto en caso de que el número no coincida con ninguno de los casos anteriores
  }
}

  showAlert(num: number) {
      this.confirmLogOut = !this.confirmLogOut;
      if (this.confirmLogOut == true) {
          let alert: HTMLElement | null =
            document.querySelector('#logout-account');
          if (alert instanceof HTMLElement) {
            alert.style.display = 'block';
          }
        }
      if (this.isMenuOpen == true) {
        this.toggleMenu();
      }
      if ((num == 1)) {
        this.showDelete = true;
      }else if(num == 2){
        this.showLogOut = true;
      }else {
        this.showDelete = false;
        this.showLogOut = false;
       
      }
  }

  logout() {
    this.router.navigate(['']);
    sessionStorage.clear();
  }

  deleteAccount(){
    if(this.user?.id){
      this.userService.deleteUser(this.user.id).subscribe(() => {
        sessionStorage.clear();
        this.router.navigate(['']);
      });
  }
  }
 
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
  

}