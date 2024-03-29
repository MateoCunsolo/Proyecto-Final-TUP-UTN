import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup = this.fb.group({
    userName: new FormControl('', [Validators.required]), 
    password: new FormControl('',[Validators.required])
  })
  
  flag = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  loginUser()
  {
    if(this.loginForm.invalid) return;

    const user : IUser = {
      userName: this.loginForm.controls['userName'].value,
      email: null,
      password: this.loginForm.controls['password'].value,
      lists: [],
      comments: null
    } //capturo los datos del formulario y creo el objeto con ellos
    
    this.userService.getUsers().subscribe((listUsers: IUser[]) => {
      const users = listUsers.filter(u => u.userName === user.userName && u.password === user.password)
      if (users.length > 0) {
        if(users[0].id)
        {
          this.userService.getOneUser(users[0].id).subscribe((user: IUser | undefined) => {
            if (user) {
              this.userService.setUserSessionStorage(user);
              this.router.navigate(['home']);
            }
          });
        }
      } else {
      {
        let p: HTMLElement | null = document.getElementById("msj-login");
        if(p != null)
        {
          p.classList.add("show");
          
          let formAfterSumbit : HTMLElement | null = document.getElementById("login-form");
          if(formAfterSumbit != null)
          {
            formAfterSumbit.addEventListener("click", function(){
              p?.classList.remove("show");
            });
          }
        }
      }
      }
    });
  }

  validate(field: string, error: string){
    return this.loginForm.controls[field].getError(error)
    && this.loginForm.controls[field].touched
  }

}

