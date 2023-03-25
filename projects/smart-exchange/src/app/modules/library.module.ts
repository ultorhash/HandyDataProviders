import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { GridsterModule } from 'angular-gridster2';
import { HighchartsChartModule } from 'highcharts-angular';
import { UiCoreModule } from 'ui-core';

@NgModule({
  exports: [
    AgGridModule,
    GridsterModule,
    HighchartsChartModule,
    UiCoreModule
  ]
})
export class LibraryModule {}
