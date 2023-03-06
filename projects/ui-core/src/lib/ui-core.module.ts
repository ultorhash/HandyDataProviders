import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  exports: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatProgressBarModule
  ]
})
export class UiCoreModule {}
