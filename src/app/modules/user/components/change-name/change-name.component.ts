import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {

  changeUsernameForm: FormGroup = this.fb.group({
    newUserName: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(private fb: FormBuilder, private router: Router,  private userService: UserService) { }

  userName: string = '';
  user: IUser | null = null;
  userStr: any = sessionStorage.getItem('user');
 

  ngOnInit(): void {
    
      if (this.userStr) {
      this.user = JSON.parse(this.userStr);
      }
  }



  async ChangeUsername(){

    if(this.changeUsernameForm.invalid) return;

    const username : string = this.changeUsernameForm.controls['newUserName'].value;
    console.log(username);
    console.log("nuevo user" + username)

    const isAvailable = await this.userService.checkIfUsernameAvailable(username);
    console.log(isAvailable)

    if (isAvailable) {
      // El nombre de usuario está disponible
      const oldUsername: number | "" = this.user?.id ?? '';
      console.log("usuario viejo" + oldUsername);

      if (oldUsername !== '') 
      {
        this.userService.changeUsername(oldUsername, username);
        alert("Username changed successfully");
        console.log(this.userStr + "viejo");

        if (this.user) {
          this.user.userName = username;
          console.log(this.userStr + "actualizado");
          sessionStorage.setItem('user', JSON.stringify(this.user));
        }
        this.router.navigate(['home']);
      } else 
      {
        alert("Username not changed");
      }

    }else 
    {
      // El nombre de usuario no está disponible
      alert("Username already taken");
      return;
    }
      
  }

  validate(field: string, error: string){
    return this.changeUsernameForm.controls[field].getError(error)
    && this.changeUsernameForm.controls[field].touched
  }
}