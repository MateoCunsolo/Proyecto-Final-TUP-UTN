import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList} from 'src/app/core/Interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  list: IList | null = null
  name: string | undefined;
  listEditable: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() 
  {
      this.route.url.subscribe(urlSegments => {
        if (urlSegments.some(segment => segment.path === 'list')) {
          this.list = JSON.parse(sessionStorage.getItem('listClicked')!);
          this.name = this.list?.name;
          if(this.list?.id == 1 || this.list?.id == 2)
          {
            this.listEditable = false;
          }else
          {
            this.listEditable = true;
          }
          sessionStorage.setItem('listEditable', JSON.stringify(this.listEditable));
        }

        this.listEditable = JSON.parse(sessionStorage.getItem('listEditable')!);

      });
  }
}