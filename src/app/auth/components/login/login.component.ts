import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private fb: FormBuilder,private authService:AuthService) { }
 
  ngOnInit(): void {
    this.form= this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  onSubmit(){
    this.authService.login({
      email:this.form.value.email,
      password:this.form.value.password
    })
  } 

  get f()  {
    return this.form.controls
  }
  

}
