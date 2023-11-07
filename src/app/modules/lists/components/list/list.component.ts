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
  moviesInToWatchList: any[] = []; // Almacena las películas en la lista "To Watch"
  user: IUser | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    //paramMap.subscribe() se suscribe a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      // params.get('name') para obtener el valor del parámetro 'name' de la URL
      this.nameList = params.get('name');
    });



   /* let userSstr = sessionStorage.getItem('user'); //me levanta el usuario

    if (userSstr != null) 
    {
      this.user = JSON.parse(userSstr);
   // Busca la lista "To Watch" en las listas del usuario
   const toWatchList=this.user?.lists.find(list => list.name === 'To Watch');
   if (toWatchList) 
   {
    // Obtiene las películas de la lista "To Watch" utilizando los IDs
    const movieIds = toWatchList.idMovies;
    this.moviesInToWatchList = JSON.parse(sessionStorage.getItem('idMovies')).filter(movie => movieIds.includes(movie.id));

  }*/
    }


        
        
    
      
  }

