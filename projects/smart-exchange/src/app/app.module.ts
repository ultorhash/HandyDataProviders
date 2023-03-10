import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { GridsterModule } from 'angular-gridster2';
import { HighchartsChartModule } from 'highcharts-angular';
import { UiCoreModule } from 'ui-core';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  DashboardComponent
} from './components';
import { BasicChartComponent } from './components/shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BasicChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule,
    AgGridModule,
    GridsterModule,
    HighchartsChartModule,
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
