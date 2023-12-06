import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';




@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  
  prueba: string = 'linear_reveal_both entry_5%_cover_30% view';
  mostrarTexto: boolean = false;

  private scrollSubject = new Subject<number>();
  scroll$: Observable<number> = this.scrollSubject.asObservable();

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.scrollSubject.next(window.scrollY);
  }

  constructor(private router: Router) {
    this.scroll$
      .pipe(
        debounceTime(100), // Espera 200 milisegundos después del último evento
        distinctUntilChanged(), // Asegura que solo se procesan eventos cuando el valor cambia
        filter(scrollPosition => scrollPosition > 100) // Filtra eventos cuando el usuario ha bajado más de 100 píxeles
      )
      .subscribe(() => {
        this.mostrarTexto = true;
      });
  }

  

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }


    
  
    
  
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

