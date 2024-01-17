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
  userId: number = 0;
  listId: number | undefined = 0;
  listName: string  = ' ';
  list: IList | null = null;

  constructor(private router: Router, private userService: UserService, private renderer: Renderer2, private route: ActivatedRoute, private el: ElementRef, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
     
    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
    }


    this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path === 'list')) {
        this.listName = JSON.parse(sessionStorage.getItem('listClicked')!);
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
      this.userService.deleteList(this.userId,this.listName);
      this.router.navigate(['home']);
    } catch (error) {
      console.error(error);
    }
  }
}




