import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/Interfaces';
import { IList } from 'src/app/core/Interfaces';
import { IMovie } from 'src/app/core/Interfaces';
import { ActivatedRoute } from '@angular/router';

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
  movieId: number = 0;

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
  
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.movieId=+params ['id']
    })


    let userSstr = sessionStorage.getItem('user');
    if(userSstr!=null)
    { 
      this.user = JSON.parse(userSstr);
      if(this.user)
      {
        this.lists = this.user.lists;
        
        if(this.lists)
        {
          this.list.movies.movie.push(this.movieId);
        }
        //console.log(this.lists);
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


