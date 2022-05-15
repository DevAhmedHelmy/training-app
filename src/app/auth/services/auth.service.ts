import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../atuh.data.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user:User
  constructor(private router:Router,private auth:AngularFireAuth) { }


  register(authData:AuthData){
    this.user={
      email:authData.email,
      userId:Math.round(Math.random()*10000).toString()
    }
    this.authSuccesslly();

  }
  login(authData:AuthData){
    this.user={
      email:authData.email,
      userId:Math.round(Math.random()*10000).toString()
    }
    this.authSuccesslly();
  }

  logout(){
    this.user={email:'',userId:''};
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser(){
    return {...this.user};
  }

  isAuth(){
    return this.user != null;
  }

  private authSuccesslly(){
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
