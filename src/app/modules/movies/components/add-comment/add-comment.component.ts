import { Component, OnInit } from '@angular/core';
import { IComment, IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/modules/movies/services/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  flag: boolean = false;
  userId: number = 0;
  movieId: number = 0;
  username: string = '';
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);

      this.userService.getUserName(this.userId).then((user) => {
        this.username = user.username;
      });
    }
      this.route.params.subscribe((params) => {
        this.movieId = +params['id'];
      });
    }


  visibility() {
    this.flag = !this.flag;
  }

  checkId(): boolean {
    if (this.userId !== undefined) {
      return true;
    }
    return false;
  }

  postComment() {
    const area = document.getElementById(`textarea`) as HTMLTextAreaElement;

    const comment: IComment = {
      username: this.username ?? null,
      text: area.value ?? null,
      idMovie: this.movieId,
    };

    if (this.userId !== undefined) {
      this.commentsService.emitEvent({ comment: comment });
      this.userService.addCommentToUser(this.userId, comment);
      area.value = '';
      this.visibility();
    }
  }
}
