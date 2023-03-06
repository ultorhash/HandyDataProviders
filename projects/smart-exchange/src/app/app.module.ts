import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'angular-highcharts';
import { UiCoreModule } from 'ui-core';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  DashboardComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    ChartModule,
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
