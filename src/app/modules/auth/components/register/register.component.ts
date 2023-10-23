import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private email: string = '';
  
  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  registerForm: FormGroup = this.fb.group({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),//digo que es requerido y que necesita como minimo cuatro campos
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })


  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  saveUser(){

    //this.formulario.reset() limpia el formulario, lo vuelve a cero

    if(this.formulario.invalid) return; //si el formulario es invalido, que no me retorne el objeto (osea nada)
    
    //metodo de comparacion de contraseñas, que despues lleve a la creacion del objeto usuario

    const user : User = {
      userName: this.formulario.controls['userName'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      id: 0
    } //capturo los datos del formulario y creo el objeto con ellos
    
    this.userService.postUser(user);
    
    //console.log(registeredUser);

  
  

}
  

