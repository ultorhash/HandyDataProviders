import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { GridsterModule } from 'angular-gridster2';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  exports: [
    AgGridModule,
    GridsterModule,
    HighchartsChartModule
  ]
})
export class LibraryModule {}
