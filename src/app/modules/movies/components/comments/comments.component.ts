import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

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
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        //incializo el primer comentario de entrada, es decir el primero que voy a mostrar en pantalla
        this.indexComments = 0;
        this.comment = this.comments[0]?.comment || 'Ningun usuario ha comentado!';
        this.name = this.comments[0]?.name || '';
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
