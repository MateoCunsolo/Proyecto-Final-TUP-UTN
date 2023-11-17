import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { Movie } from 'src/app/core/movie.interface';
import { eventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-movie-watched',
  templateUrl: './movie-watched.component.html',
  styleUrls: ['./movie-watched.component.css']
})
export class MovieWatchedComponent implements OnInit {

  confirmMoveMovie: boolean = false;
  user: IUser | null = null;
  movieId: number | undefined  = 0;
  

   // Nueva propiedad para recibir la movie desde el componente padre
 @Input() movieToMove: Movie | undefined;

  constructor(private eventService: eventsService, private router: Router, private userService: UserService, private route: ActivatedRoute,  private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    this.movieId = this.movieToMove?.id; //levanto el id de la peli desde el componente padre

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.confirmMoveMovie = false;
      }
    });
    
  }

  addMovie() {
  
    this.confirmMoveMovie=true;
    
    setTimeout(()=>{
      if (this.user?.id !== undefined && this.movieId !== undefined) {

        this.userService.addMovieToList(this.user.id, 1, this.movieId);
    
          this.user.lists[1].idMovies.push(this.movieId);
          this.userService.setUserSessionStorage(this.user);
        
        sessionStorage.removeItem('listClicked');

      } else {
        console.log('Something went wrong');
      }

      setTimeout(() => {
        this.deleteMovie();
      }, 300);

    },1500)

  }

  deleteMovie() 
  {        
    if (this.user?.id) 
    {
      try {
        if(this.movieId !== undefined)
        { 
          
          this.userService.removeMovieFromList(this.user.id, 0, this.movieId);

          // guardo la posicion de la lista para despues borrarla
          const movieIndex = this.user.lists[0].idMovies.indexOf(this.movieId);
          if (movieIndex !== -1) 
          {
            //la elimino
            this.user.lists[0].idMovies.splice(movieIndex, 1);
          }
  
          this.userService.setUserSessionStorage(this.user); //actualizo la info del usuario

          this.eventService.emitEvent("movieDeleted", {movieDeleted: this.movieId}); //aviso que se borro la peli
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
