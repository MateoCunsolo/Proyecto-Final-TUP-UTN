import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/Interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  changePassForm: FormGroup = this.fb.group(
    {
    currentPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPass: new FormControl('', [Validators.required, Validators.minLength(6)])
  },
  { validators: this.passwordMatch('newPass', 'confirmPass') }
  );
  

  constructor(
    private fb: FormBuilder, 
    private router: Router,  
    private userService: UserService) { }

  userName: string = '';
  user: IUser | null = null;
  userStr: any = sessionStorage.getItem('user');
 

  ngOnInit(): void {
    
      if (this.userStr) {
      this.user = JSON.parse(this.userStr);
      }
  }

  ChangePassword(){

    
      
  }

  validate(field: string, error: string){
    return this.changePassForm.controls[field].getError(error)
    && this.changePassForm.controls[field].touched
  }

  passwordMatch(newpass: string, confirm_password: string) {
    
    return function (form: AbstractControl) {
      const passwordValue = form.get(newpass)?.value;

      const confirmPasswordValue = form.get(confirm_password)?.value;

      if (passwordValue === confirmPasswordValue) return null;

      return { passwordMismatcgError: true };
    };
  }

  currentPassMatch(currentPass: string) {
      
      return  (form: AbstractControl) => {
        const passwordValue = form.get(currentPass)?.value;
  
        const currentUserPass = this.user?.password;
  
        if (passwordValue === currentUserPass) return null;
  
        return { passwordMismatcgError: true };
      };
  }


}
