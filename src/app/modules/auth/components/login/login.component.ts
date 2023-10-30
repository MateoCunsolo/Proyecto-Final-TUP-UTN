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
      lists: null,
      comments: null

    } //capturo los datos del formulario y creo el objeto con ellos
    
    this.userService.getUsers().subscribe((listUsers: IUser[]) => {
      console.log(listUsers);
      const users = listUsers.filter(u => u.userName === user.userName && u.password === user.password)

      if(users.length > 0){
        console.log('Usuario logueado');
        //cargar los atributos del usuario con el jsonserver 
        this.router.navigate(['home'])
      }else
      {
        console.log('Usuario no logueado');
        let p: HTMLElement | null = document.getElementById("msj-login");
        if(p != null)
        {
          p.classList.add("show");
          //p.innerHTML = "Usuario y/o contraseña incorrectos";
        }

      }
    })


  }

  validate(field: string, error: string){
    return this.loginForm.controls[field].getError(error)
    && this.loginForm.controls[field].touched
  }

}
