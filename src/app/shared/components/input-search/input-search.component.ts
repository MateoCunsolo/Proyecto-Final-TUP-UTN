import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieData } from 'src/app/core/movie.interface';
import { FilteringService } from 'src/app/services/filtering.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit {
  constructor(
    public moviesService: PeliculasService,
    private service: FilteringService
  ) {}
  enterPressed: boolean = false;

  ngOnInit(): void {}

  search() {
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    this.service.emitEvent('search', { search: inputSearch.value });
    this.enterPressed = true;
  }
    
  removeSearch() {
    
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    inputSearch.value = '';
    this.service.emitEvent('search', { search: 'remove' });
    this.enterPressed = false;

  }
  

  onInputChange() {
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    if (inputSearch.value === '') {
      this.removeSearch(); // Restablece a false si el campo está vacío
    }
  }
}
