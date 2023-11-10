import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { IList} from 'src/app/core/Interfaces';
import { eventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: IList | null = null
  nombreLista: string = "";

  constructor(private route: ActivatedRoute, private eventService: eventsService, private router: Router) { }

  ngOnInit() 
  {
    this.handleNavigationEndEvent();
    

    /*if (listSstr != null) 
    {
      this.list = JSON.parse(listSstr);
      if (this.list) 
      {
        this.moviesInSpecificList = this.list?.idMovies
        this.nombreLista = this.list?.name || "";
        console.log("aca esta el nombre " +this.nombreLista);
        //console.log(this.moviesInSpecificList) lo levanta bien
      }

    }*/
  }

  private handleNavigationEndEvent() {
    this.eventService.getEvent('LClicked').subscribe((listClicked) => {
      console.log(listClicked);
      this.nombreLista = listClicked?.data.name;
    });
  }

  
};
