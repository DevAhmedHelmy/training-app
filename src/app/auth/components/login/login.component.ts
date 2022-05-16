import { state } from '@angular/animations';
import { State } from './../../../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UIService } from 'src/app/core/services/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loadingSubs: Subscription;
  isLoading$: Observable<boolean>;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State}>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select('ui').pipe(map(state => state.isLoading));
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password,
    });
  }

  get f() {
    return this.form.controls;
  }
  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
