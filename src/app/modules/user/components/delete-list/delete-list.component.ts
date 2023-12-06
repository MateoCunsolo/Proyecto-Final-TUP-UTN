import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private userService: UserService, private renderer: Renderer2, private route: ActivatedRoute, private el: ElementRef, private cdRef: ChangeDetectorRef) { }

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

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.confirmDelete = false;
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
      this.changeStatus();
    }
  }

  deleteList() {
    try {
      if (this.user?.id && this.listId !== undefined) {

        // Guardo la posición de la lista para después borrarla
        const listIndex = this.user.lists.findIndex(list => list.id === this.listId);

        this.userService.deleteListComplete(this.user.id, listIndex);

        // Verifico si la lista existe en la posición especificada
        if (this.user.lists && this.user.lists[listIndex]) {
          this.user.lists.splice(listIndex, 1);
        }
        // Actualizo la información del usuario
        this.userService.setUserSessionStorage(this.user);

        this.router.navigate(['home']);

      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error(error);
    }
  }
}




