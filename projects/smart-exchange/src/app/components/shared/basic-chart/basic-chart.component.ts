import { Component } from '@angular/core';
import { Colors } from '../../../enums';

import * as Highcharts from 'highcharts';
import HCStockModule from 'highcharts/modules/stock';
import HCData from 'highcharts/modules/data';
import HCExporting from 'highcharts/modules/exporting';
import HCHollowCandleStick from 'highcharts/modules/hollowcandlestick';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCTools from 'highcharts/modules/stock-tools';

HCStockModule(Highcharts);
HCData(Highcharts);
HCExporting(Highcharts);
HCHollowCandleStick(Highcharts);
HCAccessibility(Highcharts);
HCTools(Highcharts);

@Component({
  selector: 'app-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.scss']
})
export class BasicChartComponent {
  protected Highcharts: typeof Highcharts = Highcharts;
  protected chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: Colors.GRAY800
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      gridLineColor: Colors.GRAY700,
      gridLineWidth: 1,
    },
    yAxis: {
      title: undefined,
      gridLineColor: Colors.GRAY700
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Bitcoin',
        type: "hollowcandlestick"
      }
    ]
  };

  constructor() {}
}
