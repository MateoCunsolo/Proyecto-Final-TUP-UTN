import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})


export class AddlistComponent implements OnInit {

  isVisibilityActive: boolean = true;

  user: IUser | null = null;
  lists: IList[] = [];

  userId: number = 0;
  movieId: number = 0;

  listsNames: String[] = []; //arreglo donde van a ir los nombrs de las listas del usuario
  selectedListId: number = 0; //aca guardo el id de la lista que selecciona el usuario

  menuDesplegableVisible = false;

  mostrarMenuDesplegable() {
    this.menuDesplegableVisible = !this.menuDesplegableVisible;
    this.isVisibilityActive =!this.isVisibilityActive;
  }

  onListaSeleccionadaChange() {
    console.log("Lista seleccionada:", this.selectedListId); //aca me lo muestra bien
  }

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void 
  {

    this.route.params.subscribe(params => {
      this.movieId = +params['id']
    })

    //para obtener los nombres de las listas y armar el listado
    let userSstr = sessionStorage.getItem('user'); //me levanta el usuario

    //este bloquesito es que el que me trae los nombres de las lsitas para el listado
    if (userSstr != null) 
    {
      this.user = JSON.parse(userSstr);
      // Recorre las listas del usuario y extrae los nombres
      this.user?.lists.forEach((lista) => {
        this.listsNames.push(lista.name);
      });
    }


    if (userSstr != null) 
    {
      this.user = JSON.parse(userSstr); //lo paso a formato json

      if (this.user) {
        console.log(this.user.id);

        this.lists = this.user.lists;
        console.log(this.lists);

      }
    }

  }

  agregarPelicula() {
    if (this.selectedListId !== 0) 
    {
      if (this.user?.id !== undefined) 
      {
        console.log('id Usuario ' + this.user.id + 'id de la lista seleccionada ' + this.selectedListId + 'id de la pelicula ' + this.movieId )
        //la posicion de la lista en el arreglo es uno menos que el id de esa lista
        this.userService.addMovieToList(this.user.id, this.selectedListId-1, this.movieId);
        this.selectedListId = 0;
        this.mostrarMenuDesplegable();
      } 
      else {
        console.log("Algo salió mal");
      }
    } else {
      console.log("Por favor, selecciona una lista.");
    }
  }

}
