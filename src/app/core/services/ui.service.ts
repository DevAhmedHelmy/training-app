import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private matSnackbar: MatSnackBar) {}

  showSnackbar(message: any, action: any, duration: any) {
    this.matSnackbar.open(message, action, {
      duration: duration,
    });
  }
}
