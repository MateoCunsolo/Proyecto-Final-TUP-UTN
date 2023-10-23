import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/Models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //group es un metodo de formBuilder
  //inicializo los atributos en vacio, es necesario inicializar el formulario

  formulario: FormGroup = this.formBuilder.group({
    userName:['', [Validators.required, Validators.minLength(4)]], //digo que es requerido y que necesita como minimo cuatro campos
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    passwordTwo:['', [Validators.required, Validators.minLength(6)]],
    id:0
  })


  //inyecto el objeto que cree arriba
  //formBuilder es una clase de angular que se inyecta
  constructor(private formBuilder: FormBuilder, 
              private userService: UserService
             ) { }
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
      id: this.formulario.controls['id'].value
    } //capturo los datos del formulario y creo el objeto con ellos
    
    this.userService.postUser(user);
    //console.log(registeredUser);
  }

  
}
