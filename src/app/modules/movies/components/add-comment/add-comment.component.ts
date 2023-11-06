import { Component, OnInit } from '@angular/core';
import { IComment, IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/modules/movies/services/comments.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  flag: boolean = false;
  user: IUser | null = null;
  movieId: number = 0
  constructor(public userService: UserService,private route: ActivatedRoute, private commentsService: CommentsService ) { }

  ngOnInit() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    this.route.params.subscribe(params => {
    this.movieId = +params['id'];
    });  

  }

  visibility() {
    this.flag = !this.flag;
  }


  postComment() {
    if(this.user != null) { ;
    console.log(this.user); 
    const area = document.getElementById(`textarea`) as HTMLTextAreaElement;
    const comment : IComment = {
      name: this.user?.userName ?? null,
      comment: area.value ?? null,
      idMovie: this.movieId
    }  
    
    this.commentsService.emitEvent({ comment: comment});

    if (this.user?.id !== undefined) {
      
      this.userService.addCommentToUser(this.user.id, comment);
    }

    area.value = '';
    
    // pushear a la lista d comentarios d una peli en especifico

    this.visibility();
    alert('Comment added successfully');
  }

  }
}
