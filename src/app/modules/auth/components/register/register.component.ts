import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { IList, IUser } from 'src/app/core/Interfaces';
import { Observable, debounceTime, distinctUntilChanged, from, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {
  private email: string = '';
  registerForm!: FormGroup;

  private emailPattern: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  
 /* registerForm = new FormGroup(
    {
      userName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
        asyncValidators: [this.checkUsernameAvailability.bind(this)],
        updateOn: 'blur', // Update the validation on blur
      }),
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
  );*/

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]], /*this.checkUsernameAvailability.bind(this)],*/
      email: ['', [ Validators.required, Validators.pattern(this.emailPattern)]],/* this.checkEmailAvailability.bind(this)],*/
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', [Validators.required]],
    },
    {
      validators: [this.passwordMatch('password', 'confirmPassword')]} 
    );

  /*  this.registerForm.controls['userName'].valueChanges
    .pipe(
      debounceTime(300), // Esperar 300 milisegundos después de la última pulsación de tecla
      distinctUntilChanged(), // Solo continuar si el valor ha cambiado
      switchMap(username => this.userService.getUsernameAvailability(username))
    )
    .subscribe(isTaken => {
      if (!isTaken) {
        console.log('Username is already taken');
        this.getControl('userName')?.setErrors({ 'usernameTaken': true });
      } else {
        // Restablecer los errores si el nombre de usuario está disponible
        this.getControl('userName')?.setErrors(null);
      }
    });

    this.registerForm.controls['email'].valueChanges
    .pipe(
      debounceTime(300), // Esperar 300 milisegundos después de la última pulsación de tecla
      distinctUntilChanged(), // Solo continuar si el valor ha cambiado
      switchMap(email => this.userService.getEmailAvailability(email))
    )
    .subscribe(isTaken => {
      if (!isTaken) {
        console.log('Email is already taken');
        this.getControl('email')?.setErrors({ 'emailTaken': true });
      } else {
        // Restablecer los errores si el nombre de usuario está disponible
        this.getControl('email')?.setErrors(null);
      }
    });*/

  }

  getControl(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }

  passwordMatch(password: string, confirm_password: string) {
    return function (form: AbstractControl) {
      const passwordValue = form.get(password)?.value;
      const confirmPasswordValue = form.get(confirm_password)?.value;
  
      if (passwordValue === confirmPasswordValue) {
        if (form.get(confirm_password)?.hasError('passwordMismatchError')) {
          form.get(confirm_password)?.setErrors(null); // Clear the error if passwords match
        }
        return null; // Passwords match, no error
      }else
      {
        // Passwords don't match, set the error
      form.get(confirm_password)?.setErrors({ passwordMismatchError: true });
  
      return { passwordMismatchError: true }; // Return the error

      }
  
      
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

  /*
  checkUsernameAvailability(control: AbstractControl): Observable<{ [key: string]: any } | null> {
    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap(username => {
        if (!username) {
          return of(null);
        }

        return from(this.userService.checkIfUsernameAvailable(username)).pipe(
          map(isAvailable => (isAvailable ? null : { usernameTaken: true }))
        );
      })
    );
  }

  checkEmailAvailability(control: AbstractControl): Observable<{ [key: string]: any } | boolean> {
    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap(email =>
        this.userService.checkIfEmailExists(email).pipe(
          tap(isTaken => console.log('Is taken:', isTaken)),
          map(isTaken => (!isTaken ? { emailTaken: true } : false))
        )
      )
    );
  }*/

  

  
  
}
