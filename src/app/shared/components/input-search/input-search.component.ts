
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieData } from 'src/app/core/movie.interface';
import { FilteringService } from 'src/app/services/filtering.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import{Router} from '@angular/router';
@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit {
  constructor(
    public moviesService: PeliculasService,
    private service: FilteringService,
    public router:Router
    
  ) {}
  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef | null = null;

  enterPressed: boolean = false;

  ngOnInit(): void {
    if (this.inputSearch) {
      this.inputSearch.nativeElement.focus();
    }
  }
  

  
  search() {
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    if (this.router.url === '/home')
    {
      this.service.emitEvent('search', { search: inputSearch.value }); 
    }
    else
    {  
      this.router.navigate(['/home'], { queryParams:{ search: inputSearch.value } });
      this.service.emitEvent('search', { search: inputSearch.value } );
    }
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
      this.removeSearch();
    }
  }
}
