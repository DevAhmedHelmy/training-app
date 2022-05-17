import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UIService } from 'src/app/core/services/ui.service';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/ui.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate: any;
  loadingSubs: Subscription;
  isLoading$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.maxDate = new Date();
    this.maxDate.getFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: any) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password,
    });
    console.log(form);
  }
}
