import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { IMovie } from 'src/app/core/Interfaces';
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
  movies: IMovie [] = [];

  list: IList = {
    "name": " ",
    "id": 0,
    "movies": this.movies
  }
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

   

  visibility(){
    this.isVisibilityActive = !this.isVisibilityActive;
  }
  
  constructor() { }

  ngOnInit(): void {

    let userSstr = sessionStorage.getItem('user');
    if(userSstr!=null)
    { 
      this.user = JSON.parse(userSstr);
      if(this.user)
      {
        this.lists = this.user.lists;
        
        console.log(this.lists);
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


