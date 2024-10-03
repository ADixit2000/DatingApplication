import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {   
  http = inject(HttpClient);
  registerMode = false;
  users: any;
    registerToggle(){
    this.registerMode = !this.registerMode
  }

  ngOnInit(): void {
    this.getUser();
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  } 
  
  getUser(){
    this.http.get('https://localhost:2001/api/user').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has Completed')
      
    })

  }
}
