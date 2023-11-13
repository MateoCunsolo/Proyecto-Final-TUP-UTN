import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';
import { eventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})

export class EditListComponent implements OnInit {
  confirmChange: boolean = false;
  inputMode: boolean = false;
  newListName: string = '';
  listName: string | undefined = '';
  message: string = ' ';
  user: IUser | null = null;
  listId: number | undefined = 0;
  list: IList | null = null;


  constructor(private eventsService:eventsService, private router: Router, private userService: UserService, private renderer: Renderer2, private route: ActivatedRoute, private el: ElementRef, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.userService.getUserSessionStorage();

    this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path === 'list')) {
        this.list = JSON.parse(sessionStorage.getItem('listClicked')!);
        this.listId = this.list?.id;
        this.listName = this.list?.name;
      }
    });

  }

  changeStatus() {
    this.confirmChange = !this.confirmChange;
    this.inputMode = false; // Restablecer el modo de entrada al cerrar la ventana
  }

  showAlert(num: number) {
    if (num === 1) {
      if (this.inputMode) {
        // Validar que el nuevo nombre no esté vacío, no contenga solo espacios en blanco y no contenga espacios en medio del texto
        if (this.newListName.trim() !== '' && !/\s/.test(this.newListName)) {
          this.message = 'New saved name: ' + this.newListName;
          this.editList()
        }
        else {
          alert('The name cannot be empty or contain only whitespace.');
          return; // Evitar continuar si el nombre no es válido
        }
      } else {
        this.message = 'okey';
      }
      alert(this.message);
      this.changeStatus(); // Cerrar la ventana de confirmación después de guardar o cancelar
    }
    else {
      this.message = 'okey';
      alert(this.message);
      this.changeStatus(); // Cerrar la ventana de confirmación después de guardar o cancelar
    }
  }

  toggleInputMode() {
    this.inputMode = !this.inputMode;
  }

  editList() {
    try {
      if (this.user?.id && this.listId !== undefined && this.newListName) {
        // Verificar si ya existe una lista con el mismo nombre
        const listExists = this.user.lists.some(list => list.name === this.newListName);

        if (listExists) {
          alert('There is already a list with that name. Please choose another name.');
          return;
        }

        // Guardo la posición de la lista para después modificarla
        const listIndex = this.user.lists.findIndex(list => list.name === this.listName);

        // Modifico el nombre de la lista utilizando el servicio
        this.userService.changeListName(this.user.id, this.newListName, listIndex)
          .subscribe((updatedUser: IUser) => {
            // Verifico si la lista existe en la posición especificada
            if (updatedUser.lists && updatedUser.lists[listIndex] && this.user != null) {
              // Modifico el nombre de la lista en el arreglo local
              this.user.lists[listIndex].name = this.newListName;
            }

            // Actualizo la información del usuario
            this.userService.setUserSessionStorage(updatedUser);
            sessionStorage.removeItem('listClicked');
            this.router.navigate(['home/list/' + this.newListName]);
            if (this.user != null) {
              sessionStorage.setItem('listClicked', JSON.stringify(this.user.lists[listIndex]));
              this.eventsService.emitEvent('updateLists', {user: this.user});
            }
            
          });
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
