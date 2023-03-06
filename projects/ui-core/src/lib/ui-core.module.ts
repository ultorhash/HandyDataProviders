import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SnackbarComponent } from './components/snackbar/snackbar.component';

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
    MatButtonModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ]
})
export class UiCoreModule {}
