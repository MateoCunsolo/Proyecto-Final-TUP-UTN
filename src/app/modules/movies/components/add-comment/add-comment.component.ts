import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment, IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  flag: boolean = false;
  user: IUser | null = null;
  movieId: number = 0
  constructor(public userService: UserService,private route: ActivatedRoute,) { }

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
    console.log(this.user);
    console.log(this.user?.id); 

    const comment : IComment = {
      name: this.user?.userName ?? null,
      comment: "HOLA ESTO E UN COMMENT 4",//extrear del input,
      idMovie: this.movieId
    }
    
    if (this.user?.id !== undefined) {
      this.userService.addCommentToUser(this.user.id, comment);
    }
    
    

  }
}
