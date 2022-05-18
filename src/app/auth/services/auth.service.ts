import { State } from './../../app.reducer';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../atuh.data.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { UIService } from 'src/app/core/services/ui.service';
import * as AuthActions from '../store/auth.actions';

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
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.user = {
          email: user.email,
          userId: user.uid,
        };

        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {

        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  register(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        this.store.dispatch(new AuthActions.SetAuthenticated());
      })
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }
  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((response) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AuthActions.SetAuthenticated());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    signOut(this.auth);
    this.store.dispatch(new AuthActions.SetUnauthenticated());
  }
  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
