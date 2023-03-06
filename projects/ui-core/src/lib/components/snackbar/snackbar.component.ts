import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  interval,
  Subject,
  takeUntil,
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
export class SnackbarComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
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
      .subscribe()
  }

  ngOnDestroy(): void {
    this.stopProgressBar();
  }

  onDismiss(): void {
    this.stopProgressBar();
    this.snackbarRef.dismissWithAction()
  }

  private runProgressBar(duration: number): void {
    this.progress = 100;

    interval(duration * this.step).pipe(
      tap(() => {
        this.progress -= 100 * this.step;

        if (this.progress <= 0) {
          this.stopProgressBar();
        }
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe()
  }

  private stopProgressBar(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
