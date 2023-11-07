
import { PeliculasService } from 'src/app/services/peliculas.service';
import { eventsService } from 'src/app/services/events.service';
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
    private eventsService: eventsService,
    public router:Router
    
  ) {}
  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef | null = null;

  enterPressed: boolean = false;
  searchValueOtherVist: string = '';

  ngOnInit(): void {

    let inputSearch = document.querySelector(
      '#input-search'
      )   as HTMLInputElement;
    if (this.inputSearch) {
      this.inputSearch.nativeElement.focus();
    }
    
    if(this.router.url != '/home')
    {
      inputSearch.value =  this.router.url.split('=')[1];
      if(inputSearch.value === "undefined")
      {
        this.enterPressed = false;
        inputSearch.value = '';
      }else
      {
        this.enterPressed = true;
      }
    }

    this.eventsService.getEvent('cross').subscribe((event) => {
        this.enterPressed = false;
        inputSearch.value = '';
    })
  }
  

  
  search() {
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    if (this.router.url === '/home')
    {
      this.eventsService.emitEvent('search', { search: inputSearch.value }); 
    }
    else
    {  
      this.router.navigate(['/home'], { queryParams:{ search: inputSearch.value } });
      this.eventsService.emitEvent('search', { search: inputSearch.value } );
    }
    this.enterPressed = true;
  }
    
  removeSearch() {
    const inputSearch = document.querySelector(
      '#input-search'
    ) as HTMLInputElement;
    inputSearch.value = '';
    this.eventsService.emitEvent('search', { search: 'remove' });
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
