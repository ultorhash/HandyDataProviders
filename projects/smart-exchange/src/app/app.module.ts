import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import {
  LibraryModule,
  MaterialModule,
  RoutingModule,
  TranslationModule
} from './modules';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  DashboardComponent,
  LangPickerComponent
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
    TextPipe,
    LangPickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    LibraryModule,
    TranslationModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CoinsState
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
