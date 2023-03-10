import { Component } from '@angular/core';
import { Colors } from '../../../enums';

import * as Highcharts from 'highcharts';
import HCStockModule from 'highcharts/modules/stock';
import HCData from 'highcharts/modules/data';
import HCExporting from 'highcharts/modules/exporting';
import HCHollowCandleStick from 'highcharts/modules/hollowcandlestick';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCTools from 'highcharts/modules/stock-tools';

Highcharts.AST.allowedAttributes.push('alt');

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
      useHTML: true,
      text: `
        <div class='chart__title'>
          <img
            src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
            alt='BTC'
          />
          Bitcoin
        </div>
      `,
      align: 'left',
      style: {
        color: Colors.WHITE
      }
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
