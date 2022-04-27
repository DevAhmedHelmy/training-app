import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate:any;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.maxDate= new Date();
    this.maxDate.getFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form:any){
    this.authService.register({
      email:form.value.email,
      password:form.value.password
    })
    console.log(form);
  }

}
