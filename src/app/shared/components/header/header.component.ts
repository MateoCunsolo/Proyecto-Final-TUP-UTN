import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name:string= "";
  constructor() { }

  ngOnInit(): void {
    const userSesion = sessionStorage.getItem('user');
    if (userSesion) {
    this.name = JSON.parse(userSesion).userName;

    }
}

}
