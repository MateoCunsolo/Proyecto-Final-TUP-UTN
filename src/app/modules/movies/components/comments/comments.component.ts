import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
  //no darle bola no es aca ..... respaldo
  name:string= "";
  constructor() { }

  ngOnInit(): void {
    const userSesion = sessionStorage.getItem('user');
    if (userSesion) {
    this.name = JSON.parse(userSesion).userName;
    

    }
  }


}
