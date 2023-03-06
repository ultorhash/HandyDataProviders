import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
