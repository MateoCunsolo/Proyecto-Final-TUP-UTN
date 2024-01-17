import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList} from 'src/app/core/Interfaces';
import { eventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit{

  name: string | undefined;
  listEditable: boolean = false;
  constructor(private route: ActivatedRoute,private eventsService: eventsService) {}

  ngOnInit() 
  {
      this.route.url.subscribe(urlSegments => {
        if (urlSegments.some(segment => segment.path === 'list')) {
          this.name = JSON.parse(sessionStorage.getItem('listClicked')!);
          if(this.name == "Watched" || this.name == "ToWatch")
          {
              this.listEditable = false;
          }else{
              this.listEditable = true;
          }
          sessionStorage.setItem('listEditable', JSON.stringify(this.listEditable));
        }
        this.listEditable = JSON.parse(sessionStorage.getItem('listEditable')!);
      });

      this.eventsService.getEvent("listNameChanged").subscribe(() => {
        this.name = JSON.parse(sessionStorage.getItem('listClicked')!);
      });
  }
}

