import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { ISnackbarData } from './snackbar.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {}

  open(config: ISnackbarData): MatSnackBarRef<SnackbarComponent> {
    const { message, duration, type, action } = config;

    return this.snackbar.openFromComponent<SnackbarComponent, ISnackbarData>(SnackbarComponent, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar'],
      data: {
        duration: duration,
        message: message,
        type: type,
        action: action ?? 'OK'
      }
    });
  }
}
