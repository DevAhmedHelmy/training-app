
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as fromRoot from '../../../../../app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth$ : Observable<boolean>;
  authSubscription: Subscription;
  constructor(private authService: AuthService, private store:Store<fromRoot.State>) {}

  ngOnInit(): void {
     this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (auhtStatus) => {
    //     this.isAuth = auhtStatus;
    //   }
    // );
  }
  OnToggleSideNav() {
    this.sidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }


}
