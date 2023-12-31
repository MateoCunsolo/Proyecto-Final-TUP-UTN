import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';
import { Movie } from 'src/app/core/movie.interface';
import { eventsService } from 'src/app/services/events.service';
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

  constructor(private eventService: eventsService, private router: Router, private userService: UserService, private route: ActivatedRoute,  private renderer: Renderer2, private el: ElementRef) { }

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

    //esto es para que cuando aprete en cualquier parte del body, se vuelva a plegar el menu
    this.renderer.listen('body', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target as Node)) {
        // Si el clic no está dentro del menú, cierra el menú
        this.confirmDeletMovie = false;
      }
    });
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
    
      this.changeStatus();
    }
  }


  deleteMovie() 
  {        
    if (this.user?.id) 
    {
      try {
        if(this.listId !== undefined && this.movieId !== undefined)
        { 
          
          this.userService.removeMovieFromList(this.user.id, this.listId - 1, this.movieId);

          // guardo la posicion de la lista para despues borrarla
          const movieIndex = this.user.lists[this.listId-1].idMovies.indexOf(this.movieId);
          if (movieIndex !== -1) 
          {
            //la elimino
            this.user.lists[this.listId-1].idMovies.splice(movieIndex, 1);
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
 


