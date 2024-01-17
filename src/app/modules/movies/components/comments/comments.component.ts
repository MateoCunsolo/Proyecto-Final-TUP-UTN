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
        username: event.comment?.username ?? null,
        text: event.comment?.text ?? null,
        idMovie: event.comment?.idMovie ?? null
      }  
      this.comments.unshift(comment);
      
    });
    
    this.indexComments = 0;
    this.comment = this.comments[this.indexComments]?.text || 'Ningun usuario ha comentado!';
    this.name = this.comments[this.indexComments]?.username || '';
  }
  
  



  extractCommentsJsonServer(){
    this.route.paramMap.subscribe(async (params) => {
      this.movieId = +params.get('id')!;
      (await this.userService.getCommentsForMovie(this.movieId)).subscribe(async (commentsData) => {
        for (const comment of commentsData) {
          this.comments.push(comment);
        }
        console.log(this.comments);
        this.comment = this.comments[this.indexComments].text!;
        this.name = this.comments[this.indexComments].username!;
        console.log(this.comment);
      });
      });
  }

  continueComments() {
    
    if (this.indexComments < this.comments.length - 1) {
      this.indexComments++;
      this.comment = this.comments[this.indexComments].text!;
      this.name = this.comments[this.indexComments].username!;
    }
    else
    {
      this.indexComments =  0;
      this.comment = this.comments[this.indexComments].text!;
      this.name = this.comments[this.indexComments].username!;
    }
    
  }  

  backComments() {
    
    if (this.indexComments > 0)
    {
      this.indexComments--;
      this.comment = this.comments[this.indexComments].text!;
      this.name = this.comments[this.indexComments].username!;
      
    }
    else{
      this.indexComments = this.comments.length - 1;
      this.comment = this.comments[this.indexComments].text!;
      this.name = this.comments[this.indexComments].username!;
    }
    
  }
}
