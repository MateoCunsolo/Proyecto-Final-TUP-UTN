import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

 
  user: IUser | null = this.userService.getUserSessionStorage();
  changeEmailForm!: FormGroup;
  currentP: string = '';

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { 
    this.currentP = this.user?.password || '';
    this.changeEmailForm = this.fb.group({
    newEmail:['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, this.currentPasswordValidator(this.currentP)]]
    });
  }

  ngOnInit(): void {
  }

  ChangeEmail()
  {  
    if(this.changeEmailForm.invalid) return;
    
    const email : string = this.changeEmailForm.controls['newEmail'].value;
    const userId: number | "" = this.user?.id ?? '';

    if(userId !== '')
    {
      this.userService.changeEmail(userId, email);
      if (this.user) {
        this.user.email = email;
        this.userService.setUserSessionStorage(this.user);
        this.router.navigate(['home']);
        alert("Password changed successfully");
      }else
      {
        alert("Error changing password");
      }
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
