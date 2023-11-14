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
  user: IUser | null = null;
  movieId: number = 0;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserSessionStorage();
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
    });
  }

  visibility() {
    this.flag = !this.flag;
  }

  checkId(): boolean {
    if (this.user != null && this.user?.id !== undefined) {
      return true;
    }
    return false;
  }

  postComment() {
    const area = document.getElementById(`textarea`) as HTMLTextAreaElement;
    const comment: IComment = {
      name: this.user?.userName ?? null,
      comment: area.value ?? null,
      idMovie: this.movieId,
    };

    if (this.user != null && this.user?.id !== undefined) {
      this.commentsService.emitEvent({ comment: comment });
      this.userService.addCommentToUser(this.user.id, comment);
      this.user.comments?.push(comment);
      this.userService.setUserSessionStorage(this.user);
      area.value = '';
      this.visibility();
      alert('Comment added successfully');
    }
  }
}
