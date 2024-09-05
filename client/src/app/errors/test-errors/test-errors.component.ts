import { query } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {

  baseUrl = 'https://localhost:2001/api/';
  constructor(private router: Router){

  }

  private http = inject(HttpClient);
  validationErrors: any; 

  get400Error(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error),
      this.validationErrors = error;
      }
    })
  }

  get401Error(){
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error),
      this.validationErrors = error;
      }
    })
  }

  get404Error(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error),
      this.validationErrors = error;
      }
    })
  }

  get500Error(){
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next:(response) =>  console.log(response),
      error: (error) => {
        console.log(error),
        this.router.navigate(['server-error'],{queryParams:{error:error}})
      }  
     

    })
  }

  get400ValidationError(){
    this.http.post(this.baseUrl + 'account/register',{}).subscribe({
      next: response => console.log(response),
  error: error => {
    console.log(error)
  this.validationErrors = error;
  }
    })
  }

}
