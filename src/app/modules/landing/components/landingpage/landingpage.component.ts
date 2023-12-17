import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';




@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  
  
  constructor(private router: Router) {
  }




  

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }


    
  
    
  
}


