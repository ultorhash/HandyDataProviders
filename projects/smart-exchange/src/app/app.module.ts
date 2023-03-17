import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { UiCoreModule } from 'ui-core';
import {
  LibraryModule,
  MaterialModule,
  RoutingModule
} from './modules';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  DashboardComponent
} from './components';
import { BasicChartComponent } from './components/shared';
import { CoinsState } from './store';
import { TextPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BasicChartComponent,
    TextPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    LibraryModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CoinsState
    ]),
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
