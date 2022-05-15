import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../atuh.data.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated: boolean = false;
  constructor(private router: Router, private auth: Auth) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.user = {
          email: user.email,
          userId: user.uid,
        };
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  register(authData: AuthData) {
    console.log(authData);
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  login(authData: AuthData) {
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    signOut(this.auth);
  }
  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
