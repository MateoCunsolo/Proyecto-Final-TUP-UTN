import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieData } from 'src/app/core/movie.interface';
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  constructor(public moviesService: PeliculasService, private service : FilteringService) { }

  ngOnInit(): void {

  }
  
  search() {
    const inputSearch = document.querySelector("#input-search") as HTMLInputElement;  
    this.service.emitEvent('search', {search: inputSearch.value});
  }


}