import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  currentP: string = '';
  changePassForm!: FormGroup;
  user: IUser | null = this.userService.getUserSessionStorage();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.currentP = this.user?.password || '';
    this.changePassForm = this.fb.group(
      {
        currentPass: [
          '',
          [Validators.required, this.currentPasswordValidator(this.currentP)],
        ],
        newPass: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: [this.passwordMatch('newPass', 'confirmPass')] }
    );
  }

  ngOnInit(): void { }

  ChangePassword() {
    if (this.changePassForm.invalid) return;

    const pass: string = this.changePassForm.controls['newPass'].value;
    const userId: number | '' = this.user?.id ?? '';

    if (userId !== '') {
      this.userService.changePassword(userId, pass);
      if (this.user) {
        this.user.password = pass;
        this.userService.setUserSessionStorage(this.user);
        this.router.navigate(['home']);
        alert('Password changed successfully');
      }
    }
  }

  validate(field: string, error: string) {
    return (
      this.changePassForm.controls[field].getError(error) &&
      this.changePassForm.controls[field].touched
    );
  }

  passwordMatch(newpass: string, confirm_password: string) {
    return function (form: AbstractControl) {
      const passwordValue = form.get(newpass)?.value;
      const confirmPasswordValue = form.get(confirm_password)?.value;
      if (passwordValue === confirmPasswordValue) return null;
      return { passwordMismatcgError: true };
    };
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
