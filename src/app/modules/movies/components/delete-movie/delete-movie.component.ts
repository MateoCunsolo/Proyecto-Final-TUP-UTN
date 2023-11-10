import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';
import { Movie } from 'src/app/core/movie.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})

export class DeleteMovieComponent implements OnInit 
{
  confirmDeletMovie: boolean = false;
  message: string = '';
  user: IUser | null = null;

  userId: number = 0;
  movieId: number | undefined  = 0;
  listId: number | undefined  = 0;
  listName : string| undefined  = ' ';
  list: IList | null = null;

 // Nueva propiedad para recibir el movie desde el componente padre
 @Input() movieToDelete: Movie | undefined;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path === 'list')) {
        this.list = JSON.parse(sessionStorage.getItem('listClicked')!);
        
        if(this.listId !== undefined  && this.listName !== undefined)
        {
          this.listId = this.list?.id;
          this.listName = this.list?.name
        }
      }
    });

    this.movieId = this.movieToDelete?.id; //levanto el id de la peli desde el componente padre

  }

  changeStatus()
  {
    this.confirmDeletMovie=!this.confirmDeletMovie;
  }

  showAlert(num: number) {
    if ((num == 1)) {
        this.deleteMovie();
        this.changeStatus();
    } else {
      this.message = 'okey' 
      alert(this.message)
      this.changeStatus();
    }
  }


  deleteMovie() 
  {        
    console.log(this.user?.id, this.listId, this.movieId) //imprime bien las cosas
    if (this.user?.id) 
    {
      try {
        if(this.listId !== undefined && this.movieId !== undefined)
        { 
          //console.log(this.user.id, this.listId - 1, this.movieId)
          this.userService.removeMovieFromList(this.user.id, this.listId - 1, this.movieId);

           // guardo la posicion de la lista para despues borrarla
          const movieIndex = this.user.lists[this.listId-1].idMovies.indexOf(this.movieId);
          if (movieIndex !== -1) 
          {
            //la elimino
            this.user.lists[this.listId-1].idMovies.splice(movieIndex, 1);
          }
  
          this.userService.setUserSessionStorage(this.user); //actualizo la info del usuario

          this.router.navigate(['home']); //me lleva al home
          //this.router.navigate(['home/list/' + this.listName]); //para q me vuelva a cargar la misma pag pero sin esa peli
          
        }
      }
       catch (error) {
        console.error(error);
    } 
  }else{
    console.log('error');
  }
  }
}
 


