import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {  Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../../app.reducer';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  isAuth$:Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }
  onClose() {
    this.closeSidenav.emit();
  }
  logout() {
    this.onClose();
    this.authService.logout();
  }

}
