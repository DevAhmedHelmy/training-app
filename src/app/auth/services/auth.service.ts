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
import { UIService } from 'src/app/core/services/ui.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private auth: Auth,
    private uiService: UIService
  ) {}

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
      .then((response) => {})
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
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
