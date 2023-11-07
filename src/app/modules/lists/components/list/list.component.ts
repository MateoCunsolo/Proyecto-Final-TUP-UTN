import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  nameList: String | null = ' ';
  moviesInSpecificList: number[] = []; // Almacena las películas en la lista "To Watch"
  user: IUser | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    //paramMap.subscribe() se suscribe a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      // params.get('name') para obtener el valor del parámetro 'name' de la URL
      this.nameList = params.get('name');
    });
    
    console.log(this.nameList)

    let userSstr = sessionStorage.getItem('user'); //me levanta el usuario

    //este bloquesito es que el que me trae los nombres de las listas para el listado
    if (userSstr != null) 
    {
      this.user = JSON.parse(userSstr);
      // Identificar la lista específica
      const specificList = this.user?.lists.find(list => list.name === this.nameList);
      console.log(specificList)

      // Obtener los IDs de las películas de la lista específica
      //const movieIds = specificList?.idMovies;

      };
    }
}


