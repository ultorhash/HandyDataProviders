import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  interval,
  takeWhile,
  tap
} from 'rxjs';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarTypes } from './snackbar.enum';
import { ISnackbarData } from './snackbar.interface';

@Component({
  selector: 'ui-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  private step: number = 0.005;

  public progress: number = 100;
  public snackbarTypes: typeof SnackbarTypes = SnackbarTypes;

  constructor(
    private snackbarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarData
  ) {}

  ngOnInit(): void {
    this.snackbarRef
      .afterOpened()
      .pipe(
        tap(() => {
          const duration = this.snackbarRef.instance.data.duration;
          this.runProgressBar(duration);
        })
      )
      .subscribe();
  }

  onDismiss(): void {
    this.snackbarRef.dismissWithAction();
  }

  private runProgressBar(duration: number): void {
    interval(duration * this.step).pipe(
      takeWhile(() => this.progress >= 0),
      tap(() => this.progress -= 100 * this.step)
    )
    .subscribe();
  }
}
