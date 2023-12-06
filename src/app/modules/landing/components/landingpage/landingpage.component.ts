import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  
  constructor(private router: Router) {}

  images = [
    './assets/movie-1.png',
    './assets/movie-2.png',
    './assets/movie-3.png',
    './assets/movie-4.png'
    // Añade más imágenes según sea necesario
  ];

  carouselOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000, // ajusta el tiempo de reproducción automática
  };

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }


    
  
    
  
}
