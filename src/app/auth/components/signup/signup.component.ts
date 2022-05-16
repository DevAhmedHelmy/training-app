import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';


import { AuthService } from '../../services/auth.service';
import { UIService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: any;
  loadingSubs: Subscription;
  isLoading: boolean;
  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
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
  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
