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
  
  userName: string = '';
  user: IUser | null = null;

  changeUsernameForm: FormGroup = this.fb.group({
    newUserName: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(private fb: FormBuilder, private router: Router,  private userService: UserService) {}

  
  ngOnInit(): void {
    this.user = this.userService.getUserSessionStorage();
  }

  async ChangeUsername()
  {

    if(this.changeUsernameForm.invalid) return;
    const username : string = this.changeUsernameForm.controls['newUserName'].value;
    const isAvailable = await this.userService.checkIfUsernameAvailable(username);
    if (isAvailable && this.user) {
    //El nombre de usuario está disponible y hay un usuario en sesión
      const oldUsername: number | "" = this.user?.id ?? '';
      if (oldUsername !== '') 
      {        
        this.userService.changeUsername(oldUsername, username);
        //ACTUALIZAR TAMBIEN LOS NOMBRES DE LOS COMENTARIOS EN EL JSON SERVER
        this.user.userName = username;
        this.user.comments?.forEach(comment => {
          comment.name = username;
        })

        this.userService.setUserSessionStorage(this.user);
        alert("Username changed successfully");
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