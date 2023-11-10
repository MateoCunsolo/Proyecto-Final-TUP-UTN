import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {
  private email: string = '';

  private emailPattern: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm = new FormGroup(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]), // asincronas:  vlaidators-> angular defect. sincronas:CustomValidator hechos por mua digo que es requerido y que necesita como minimo cuatro campos
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [this.passwordMatch('password', 'confirmPassword')]
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  getControl(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }

  passwordMatch(password: string, confirm_password: string) {
    
    return function (form: AbstractControl) {
      const passwordValue = form.get(password)?.value;

      const confirmPasswordValue = form.get(confirm_password)?.value;

      if (passwordValue === confirmPasswordValue) return null;

      return { passwordMismatcgError: true };
    };
  }

  saveUser() {
    if (this.registerForm.invalid) return; //si el formulario es invalido, que no me retorne el objeto (osea nada)

    const ToWatch: IList = {
      name: 'ToWatch',
      id: 1,
      idMovies: [],
    };

    const Watched: IList = {
      name: 'Watched',
      id: 2,
      idMovies: [],
    };
    
    const user: IUser = {
      userName: this.registerForm.controls['userName'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      lists: [ToWatch, Watched],
      comments: [],
    }; //capturo los datos del formulario y creo el objeto con ellos
  
    
    this.userService.postUser(user);
    
  }
}
