import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IUser } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
})
export class ChangeEmailComponent implements OnInit {
  userId: number = 0;
  changeEmailForm!: FormGroup;
  currentP: string = '';

  private emailPattern: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.changeEmailForm = this.fb.group({
      newEmail: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(){
    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
    

    this.userService.getPassword(this.userId).subscribe((data:any) => {
      this.currentP = data.password;
      this.changeEmailForm
        .get('password')
        ?.setValidators([
          Validators.required,
          this.currentPasswordValidator(this.currentP),
        ]);
      this.changeEmailForm.get('password')?.updateValueAndValidity();
    });
    }

  }

  ChangeEmail() {
    if (this.changeEmailForm.invalid) return;

    const email: string = this.changeEmailForm.controls['newEmail'].value;

    if (this.userId) {
      this.userService
        .checkIfEmailExists(this.changeEmailForm.controls['newEmail'].value)
        .subscribe((isEmailTaken) => {
          if (isEmailTaken) {
            alert('Email already exists. Please try another one!');
          } else {
            this.userService.changeEmail(this.userId, email);
            alert('Email changed successfully!');
            this.router.navigate(['home']);
          }  
        });
    }
  }

  currentPasswordValidator(currentPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const enteredPassword = control.value; // Contraseña ingresada por el usuario
      // Compara la contraseña ingresada con la contraseña almacenada en tus registros
      if (enteredPassword !== currentPassword) {
        return { invalidCurrentPassword: true }; // Contraseña actual no coincide, retorna un error
      }
      return null; // Contraseña actual coincide, no hay error
    };
  }
}
