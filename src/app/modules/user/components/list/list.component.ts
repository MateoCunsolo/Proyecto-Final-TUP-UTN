import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() 
  {
      this.route.url.subscribe(urlSegments => {
        if (urlSegments.some(segment => segment.path === 'list')) {
          this.list = JSON.parse(sessionStorage.getItem('listClicked')!);
          this.name = this.list?.name;
        }
      });
  }
};
