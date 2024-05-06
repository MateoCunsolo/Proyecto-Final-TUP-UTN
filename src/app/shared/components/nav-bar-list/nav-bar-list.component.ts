import { Component, OnInit, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IList, IUser } from 'src/app/core/Interfaces';
import { Router } from '@angular/router';
import { eventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-nav-bar-list',
  templateUrl: './nav-bar-list.component.html',
  styleUrls: ['./nav-bar-list.component.css']
})
export class NavBarListComponent implements OnInit {

  userId: number = 0; 

  lists: IList[] = [];
  listsNames: String[] = []; //arreglo donde van a ir los nombres de las listas del usuario

  isMenuOpen = false;
  newList = false;
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  constructor(private userService: UserService, private router: Router, private renderer: Renderer2, private el: ElementRef, private eventsService: eventsService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.eventsService.getEvent('listDelete').subscribe((data) => {
      this.listsNames = [];
      this.userService.getListsNamesForID( this.userId ).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.listsNames.push(data[i].name);
        }
    });
    })




    this.eventsService.getEvent("listNameChanged").subscribe((data: any) => {
      this.listsNames = [];
      this.userService.getListsNamesForID( this.userId ).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.listsNames.push(data[i].name);
        }
    });
    });

    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
      this.userService.getListsNamesForID( this.userId ).subscribe((data) => {
        console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.listsNames.push(data[i].name);
          }
      });
    }

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.isMenuOpen = false;
      }
    });
    

  }


  redirectToListDetail(listClicked: String) {
    let listName = listClicked;
    sessionStorage.setItem('listClicked', JSON.stringify(listClicked));
    this.router.navigate(['home/list/' + listName]);
  }

  addNewList() {
    if (this.userId != null) {
      if (this.listsNames.length != 6) {
        this.newList = true;
      } else {
        alert("You can't have more than 6 lists");
      }
    }
  }

 getText(valor: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    console.log('Texto ingresado:', valor);
    if (this.userId != null) {
      if (valor.trim() !== '' && !/\s/.test(valor)) {
        if (this.listsNames.find((lista) => lista === valor)) 
        {
          alert('A list with that name already exists');
          this.newList = false; //no se ve mas el input de agregar lista
        }else if(regex.test(valor)) {
          this.userService.createNewList(this.userId, valor);
          if (this.listsNames.length < 6) {
            this.listsNames.push(valor);
            this.eventsService.emitEvent('updateLists', null);
            alert(valor + ' list created successfully!');
            this.newList = false; //no se ve mas el input de agregar lista
          }  
        }else
        {
          alert( "The list name can't contain special characters, only letters and numbers")
        }
      } else 
      {
        alert("The list name can't be empty or contain spaces");
      }
    }
  }

}

