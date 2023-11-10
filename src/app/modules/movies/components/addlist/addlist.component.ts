import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  selectedListId: number = 0; //aca guardo el id de la lista que selecciona el usuario

  visibleDropdownMenu = false;

  showDropdownMenu() {
    this.visibleDropdownMenu = !this.visibleDropdownMenu;
    this.isVisibilityActive = !this.isVisibilityActive;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
    });

    this.user = this.userService.getUserSessionStorage();
    this.user?.lists.forEach((lista) => {
      this.listsNames.push(lista.name);
    });
  }

  addMovie() {
    if (this.selectedListId !== 0) {
      if (this.user?.id !== undefined) {
        //la posicion de la lista en el arreglo es uno menos que el id de esa lista
        this.userService.addMovieToList(
          this.user.id,
          this.selectedListId - 1,
          this.movieId
        );

        this.user.lists[this.selectedListId - 1].idMovies.push(this.movieId);
        this.userService.setUserSessionStorage(this.user);
        sessionStorage.removeItem('listClicked');
        this.selectedListId = 0;
        this.showDropdownMenu();
      } else {
        console.log('Something went wrong');
      }
    } else {
      console.log('Please select a list.');
    }
  }
}
