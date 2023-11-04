import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { IList, IUser } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav-bar-list',
  templateUrl: './nav-bar-list.component.html',
  styleUrls: ['./nav-bar-list.component.css']
})
export class NavBarListComponent implements OnInit {
  
  user: IUser | null = null;

  lists: IList[] = [];
  listsNames: String[] = []; //arreglo donde van a ir los nombrs de las listas del usuario

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private route: ActivatedRoute, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

    //para obtener los nombres de las listas y armar el listado
    let userSstr = sessionStorage.getItem('user'); //me levanta el usuario

    //este bloquecito es que el que me trae los nombres de las lsitas para el listado
    if (userSstr != null) 
    {
      this.user = JSON.parse(userSstr);
      // Recorre las listas del usuario y extrae los nombres
      this.user?.lists.forEach((lista) => {
        this.listsNames.push(lista.name);
      });
    }

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.isMenuOpen = false;
      }
    });
  }

}



