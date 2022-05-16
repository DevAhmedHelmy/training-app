import { State } from './../../app.reducer';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../atuh.data.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
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
    private uiService: UIService,
    private store: Store<{ ui:fromApp.State }>
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
    this.store.dispatch({type: 'START_LOADING'});
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {})
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }
  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
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
