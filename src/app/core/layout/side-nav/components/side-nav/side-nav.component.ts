import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
   
  isAuth = false;
  authSubscription:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(auhtStatus=>{
      this.isAuth=auhtStatus
    })
  }
  onClose(){
    this.closeSidenav.emit();
  }
  logout(){
    this.onClose();
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
