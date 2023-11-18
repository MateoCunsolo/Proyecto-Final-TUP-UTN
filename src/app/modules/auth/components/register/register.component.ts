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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]], 
      email: ['', [ Validators.required, Validators.pattern(this.emailPattern)]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', [Validators.required]],
    },
    {
      validators: [this.passwordMatch('password', 'confirmPassword')]} 
    );



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

    this.userService.checkIfEmailExists(this.registerForm.controls['email'].value)
    .subscribe(isEmailTaken => {
      this.userService.checkIfUsernameExists(this.registerForm.controls['userName'].value)
        .subscribe(isUsernameTaken => {
          if (isEmailTaken && isUsernameTaken) 
          {
            alert('Username and Email already taken. Please try another one!');

          } else if (isEmailTaken)
          {
            alert('Email already exists. Please try another one!');

          } else if (isUsernameTaken) 
          {
            alert('Username already exists. Please try another one!');

          } else 
          {
            // Ambos están disponibles
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
        });
    });
  
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
