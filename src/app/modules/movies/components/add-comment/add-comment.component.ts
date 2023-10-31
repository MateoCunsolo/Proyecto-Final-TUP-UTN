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
    if(this.user != null) { ;
    console.log(this.user); 

    const area = document.getElementById(`textarea`) as HTMLTextAreaElement;
    const comment : IComment = {
      name: this.user?.userName ?? null,
      comment: area.value ?? null,
      idMovie: this.movieId
    }  
  
    
    if (this.user?.id !== undefined) {
      
      this.userService.addCommentToUser(this.user.id, comment);
    }
    
    area.value = '';
    
    

    this.visibility();
    alert('Comment added successfully');
  }

  }
}
