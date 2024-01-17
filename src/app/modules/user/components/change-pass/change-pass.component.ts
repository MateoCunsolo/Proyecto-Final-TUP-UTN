import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  currentP: string = '';
  changePassForm!: FormGroup;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.changePassForm = this.fb.group({
      currentPass: ['', [Validators.required, Validators.minLength(6)]],
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    let id = sessionStorage.getItem('user') || null;
    if (id !== null) {
      id = id.replace(/[^0-9]/g, '');
      this.userId = parseInt(id);
    }

    this.userService.getPassword(this.userId).subscribe((data: any) => {
      this.currentP = data.password;
      this.changePassForm
        .get('currentPass')
        ?.setValidators([
          Validators.required,
          this.currentPasswordValidator(this.currentP),
        ]);
      this.changePassForm.get('currentPass')?.updateValueAndValidity();
    });
  }

  ChangePassword() {
    if (this.changePassForm.invalid) return;
    const pass: string = this.changePassForm.controls['newPass'].value;
    this.userService.changePassword(this.userId, pass);
    this.currentP = pass;
    this.router.navigate(['home']);
    alert('Password changed successfully');
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
      const enteredPassword = control.value;
      if (enteredPassword !== currentPassword) {
        return { invalidCurrentPassword: true };
      }
      return null;
    };
  }
}
