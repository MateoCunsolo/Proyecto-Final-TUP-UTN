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
  movieId: number | undefined  = 0;
  userId: number = 0; 
  listName : string| undefined  = '';

  @Input() movieToMove: Movie | undefined;

  constructor(private eventService: eventsService, private router: Router, private userService: UserService, private route: ActivatedRoute,  private renderer: Renderer2, private el: ElementRef) { }

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
      if (this.userId !== undefined && this.movieId !== undefined) {
        this.userService.addMovieToList(this.userId, "Watched", this.movieId);
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
    if (this.userId !== null) 
    {
      try {
        if(this.listName !== undefined && this.movieId !== undefined)
        { 
          this.userService.deleteMovieFromList(this.userId, this.listName, this.movieId);
          this.eventService.emitEvent("movieDeleted", {movieDeleted: this.movieId}); 
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
 
