import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})


export class AddlistComponent implements OnInit {
  
  isDropdownOpen: boolean = false;
  isVisibilityActive: boolean = true;

  user: IUser | null = null;
  lists: IList[] = [];
  
  
  userId: number = 0;
  movieId: number = 0;

  
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  visibility(){
    this.isVisibilityActive = !this.isVisibilityActive;
  }
  
  constructor(private route : ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void 
  {

    this.route.params.subscribe(params =>{
      this.movieId=+params ['id']
    })

    let userSstr = sessionStorage.getItem('user'); //
    if(userSstr!=null)
    { 
      this.user = JSON.parse(userSstr); //lo paso a formato json
     

      if(this.user)
      {
        console.log(this.user.id);
        //his.userId = this.user.id;

        this.lists = this.user.lists;
        console.log(this.lists);
        
        if(this.lists)
        { 
          for(let i = 0; i< this.lists.length; i++ )
          {
            const poslistaPeli = 1; //esta es la lista que selecciona el usuario
            if(this.lists[i].id == poslistaPeli) //aca encontre el id de la lista a la que quiero agregar la peli
            {
              console.log(this.lists[i]);
              console.log("lista encontrada");

              //console.log(this.lists[i].idMovies);

              // public async addMovieToList(userId: number, listId: number, movieId: number) 
              if (this.user?.id !== undefined) {
                
                console.log("id" + this.user.id + "pos lista" + i +  "mov id" + this.movieId);
                this.userService.addMovieToList(this.user.id, i, this.movieId);
                
              }else
              {
                console.log("algo malio sal");
              }
              
              
            }
          }
        }
      }    
    }


  }

  //function toggleDropdown() {
  //  var dropdown = document.getElementById("dropdown-menu");
  //  if (dropdown.style.display === "none") {
  //      dropdown.style.display = "block";
  //  } else {
  //      dropdown.style.display = "none";
  //  }

}

