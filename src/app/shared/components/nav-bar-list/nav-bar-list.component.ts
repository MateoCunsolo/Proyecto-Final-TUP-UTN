import { Component, OnInit, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IList, IUser } from 'src/app/core/Interfaces';
import { Router } from '@angular/router';
import { eventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar-list',
  templateUrl: './nav-bar-list.component.html',
  styleUrls: ['./nav-bar-list.component.css']
})
export class NavBarListComponent implements OnInit {

  user: IUser | null = null;

  lists: IList[] = [];
  listsNames: String[] = []; //arreglo donde van a ir los nombres de las listas del usuario

  isMenuOpen = false;
  newList = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  constructor(private userService: UserService, private router: Router, private renderer: Renderer2, private el: ElementRef, private eventsService: eventsService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    //para obtener los nombres de las listas y armar el listado
    let userSstr = sessionStorage.getItem('user'); //me levanta el usuario

    //este bloquecito es que el que me trae los nombres de las lsitas para el listado
    if (userSstr != null) {
      this.user = JSON.parse(userSstr);
      // Recorre las listas del usuario y extrae los nombres
      this.user?.lists.forEach((lista) => {
        this.listsNames.push(lista.name);
      });
    }
    
    this.eventsService.getEvent('updateLists').subscribe((data) => {
      this.user = this.userService.getUserSessionStorage();
    });

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.isMenuOpen = false;
      }
    });
    

  }


  redirectToListDetail(listClicked: IList) {
    const listName = listClicked.name;
    sessionStorage.setItem('listClicked', JSON.stringify(listClicked));
    this.router.navigate(['home/list/' + listName]);
  }

  addNewList() {
    if (this.user != null) {
      if (this.user.lists.length != 6) {
        this.newList = true;
      } else {
        alert("You can't have more than 6 lists");
      }
    }
  }

  getText(valor: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    console.log('Texto ingresado:', valor);

    if (this.user?.id != null) {

      if (valor.trim() !== '' && !/\s/.test(valor)) {

        if (this.user?.lists.find((lista) => lista.name === valor)) 
        {

          alert('A list with that name already exists');
          this.newList = false; //no se ve mas el input de agregar lista

        }else if(regex.test(valor)) {
          this.userService.createNewList(this.user?.id, valor);
          //actualizo la session storage
          const newList = { name: valor, id: this.user.lists.length + 1, idMovies: [] }; // Crear un nuevo objeto con la con
          this.user.lists.push(newList);
          this.newList = false; //no se ve mas el input de agregar lista


        }else
        {
          alert( "The list name can't contain special characters, only letters and numbers")
        
        }

      } else 
      {
        alert("The list name can't be empty or contain spaces");
      }
    }
  }

}

