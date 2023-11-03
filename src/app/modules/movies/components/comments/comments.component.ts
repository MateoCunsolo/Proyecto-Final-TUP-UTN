import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  
  indexComments: number = 0;
  comment: string = '';
  name: string = '';
  movieId: number = 0;
  
  comments: IComment[] = [];
  flag: boolean = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
  
    this.extractCommentsJsonServer();
    this.commentsService.getEvent().subscribe((event) => {
      const comment : IComment = {
        name: event.comment?.name ?? null,
        comment: event.comment?.comment ?? null,
        idMovie: event.comment?.idMovie ?? null
      }  
      this.comments.unshift(comment);
      this.indexComments = 0;
      this.comment = this.comments[this.indexComments]?.comment || 'Ningun usuario ha comentado!';
      this.name = this.comments[this.indexComments]?.name || '';
      
    });

  }
  
  extractCommentsJsonServer(){
    this.route.paramMap.subscribe((params) => {
      this.movieId = +params.get('id')!;
      this.userService.getUsers().subscribe((listUsers: IUser[]) => {
        for (let i = 0; i < listUsers.length; i++) {
          for (let j = 0; j < listUsers[i].comments!.length; j++) {
            if (listUsers[i].comments![j].idMovie === this.movieId) {
              listUsers[i].comments![j].name = listUsers[i].userName;
              this.comments.push(listUsers[i].comments![j]);
            }
          }
        }
        //incializo el primer comentario de entrada, es decir el primero que voy a mostrar en pantalla, es random de todos los que hya asi no hay preferencia :D 
        this.indexComments = Math.floor(Math.random() * this.comments.length);
        this.comment = this.comments[this.indexComments]?.comment || 'Ningun usuario ha comentado!';
        this.name = this.comments[this.indexComments]?.name || '';
      });
    });
  }

  continueComments() {
    
    if (this.indexComments < this.comments.length - 1) {
      this.indexComments++;
      this.comment = this.comments[this.indexComments].comment!;
      this.name = this.comments[this.indexComments].name!;
    }
    else
    {
      this.indexComments =  0;
      this.comment = this.comments[this.indexComments].comment!;
      this.name = this.comments[this.indexComments].name!;
    }
    
  }  

  backComments() {
    
    if (this.indexComments > 0)
    {
      this.indexComments--;
      this.comment = this.comments[this.indexComments].comment!;
      this.name = this.comments[this.indexComments].name!;
      
    }
    else{
      this.indexComments = this.comments.length - 1;
      this.comment = this.comments[this.indexComments].comment!;
      this.name = this.comments[this.indexComments].name!;
    }
    
  }
}
