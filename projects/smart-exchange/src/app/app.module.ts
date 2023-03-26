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
import { CoinsState } from './store';
import { TextPipe } from './pipes';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  DashboardComponent,
  LangPickerComponent
} from './components';
import {
  BasicChartComponent,
  SearchInputComponent
} from './components/shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BasicChartComponent,
    TextPipe,
    LangPickerComponent,
    SearchInputComponent
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
