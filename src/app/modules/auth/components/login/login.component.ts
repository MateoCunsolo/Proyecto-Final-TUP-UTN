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
      username: this.loginForm.controls['userName'].value,
      email: null,
      password: this.loginForm.controls['password'].value,
      lists: [],
      comments: null
    } //capturo los datos del formulario y creo el objeto con ellos
  
    this.userService.getUsers().subscribe((listUsers: IUser[]) => {
      const users = listUsers.filter(userAux => {
        return userAux.username === user.username && userAux.password === user.password;
      });
      if (users.length > 0) {
        const foundUser = users[0];
        if (foundUser.id) {
              this.userService.setUserSessionStorage(foundUser.id);
              this.router.navigate(['home']);
        }
      } else {
        let p: HTMLElement | null = document.getElementById("msj-login");
        if (p != null) {
          p.classList.add("show");
          let formAfterSubmit: HTMLElement | null = document.getElementById("login-form");
          if (formAfterSubmit != null) {
            formAfterSubmit.addEventListener("click", function(){
              p?.classList.remove("show");
            });
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

