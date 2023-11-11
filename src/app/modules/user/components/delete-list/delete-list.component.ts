import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';
import { eventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.css']
})
export class DeleteListComponent implements OnInit {

  confirmDelete: boolean = false;
  message: string = ' ';
  user: IUser | null = null;
  listId: number | undefined = 0;
  listName: string | undefined = ' ';
  list: IList | null = null;

  constructor(private eventService: eventsService, private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path === 'list')) {
        this.list = JSON.parse(sessionStorage.getItem('listClicked')!);

        if (this.listId !== undefined && this.listName !== undefined) {
          this.listId = this.list?.id;
          this.listName = this.list?.name;
         }
      }
    });

  }

  changeStatus() {
    this.confirmDelete = !this.confirmDelete;
  }

  showAlert(num: number) {
    if ((num == 1)) {
      this.deleteList();
      this.changeStatus();
    } else {
      this.message = 'okey'
      alert(this.message)
      this.changeStatus();
    }
  }

  deleteList() {
    try {
      if (this.user?.id && this.listId !== undefined) 
      {
      
      // Guardo la posición de la lista para después borrarla
      const listIndex = this.user.lists.findIndex(list => list.name === this.listName);

      this.userService.deleteListComplete(this.user.id, listIndex);

        // Verifico si la lista existe en la posición especificada
        if (this.user.lists && this.user.lists[listIndex]) 
        {
          this.user.lists.splice(listIndex,1);
        } 
          // Actualizo la información del usuario
          this.userService.setUserSessionStorage(this.user);

          console.log('List successfully deleted.');
          this.router.navigate(['home']);
        
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error(error);
    }
  }
}




