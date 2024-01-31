import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css'],
})
export class ChangeNameComponent implements OnInit {
  userName: string = '';
  userId: number = 0;

  changeUsernameForm: FormGroup = this.fb.group({
    newUserName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
    }
  }

  async ChangeUsername() {
    if (this.changeUsernameForm.invalid) return;

    const usernameNew: string =
      this.changeUsernameForm.controls['newUserName'].value;

    this.userService
      .checkIfUsernameExists(usernameNew)
      .subscribe((isAvailable) => {
        if (!isAvailable) {
          //El nombre de usuario está disponible y hay un usuario en sesión
          this.userService.getUserName(this.userId).then((user) => {
            this.userName = user.userName;
            let oldUsername: string = '' || this.userName;
            if (oldUsername !== '') {
              this.userService.changeUsername(this.userId, usernameNew);
              alert('Username changed successfully');
              this.router.navigate(['home']);
            }
          });
        } else {
          alert('Username already taken. Please try another one!');
          return;
        }
      });
  }

  validate(field: string, error: string) {
    return (
      this.changeUsernameForm.controls[field].getError(error) &&
      this.changeUsernameForm.controls[field].touched
    );
  }
}
