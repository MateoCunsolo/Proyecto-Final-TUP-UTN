import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { eventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css'],
})
export class AddlistComponent implements OnInit {
  isVisibilityActive: boolean = true;

  user: IUser | null = null;
  lists: IList[] = [];

  userId: number = 0;
  movieId: number = 0;

  listsNames: String[] = []; //arreglo donde van a ir los nombrs de las listas del usuario
  selectedListId: string = ""; //aca guardo el id de la lista que selecciona el usuario

  visibleDropdownMenu = false;

  showDropdownMenu() {
    this.visibleDropdownMenu = !this.visibleDropdownMenu;
    this.isVisibilityActive = !this.isVisibilityActive;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eventsService: eventsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
    });

    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
      this.userService.getListsNamesForID(this.userId).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            this.listsNames.push(data[i].name);
          }
      });
    }
    
    this.eventsService.getEvent('updateLists').subscribe((data) => {
      this.listsNames = [];
      let id = sessionStorage.getItem('user') || null;
      if (id !== null) {
        id = id.replace(/[^0-9]/g, '');
        this.userId = parseInt(id);
        this.userService.getListsNamesForID(this.userId).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
              this.listsNames.push(data[i].name);
            }
        });
      }
    });

  }

  addMovie() {
      if (this.userId !== null) {

        this.userService.addMovieToList(
          this.userId,
          this.selectedListId,
          this.movieId
        );

        alert('Movie added to ' + this.selectedListId + ' list!');

        sessionStorage.removeItem('listClicked');
        this.selectedListId = "";
        this.showDropdownMenu();
      }
    }


}