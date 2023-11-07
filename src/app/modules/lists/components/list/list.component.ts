import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList} from 'src/app/core/Interfaces';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  moviesInSpecificList: number[] = []; // Almacena las películas en la lista "To Watch"
  list: IList | null = null

  constructor(private route: ActivatedRoute) { }

  ngOnInit() 
  {
    let listSstr = sessionStorage.getItem('listClicked'); //me levanta el usuario
    if (listSstr != null) 
    {
      this.list = JSON.parse(listSstr);
      if (this.list) 
      {
        this.moviesInSpecificList = this.list?.idMovies
        //console.log(this.moviesInSpecificList) lo levanta bien
      }

    }
  }
};
