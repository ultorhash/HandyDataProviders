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
      backgroundColor: Colors.TRANSPARENT,
      zooming: {
        type: 'xy'
      },
      style: {
        cursor: 'crosshair'
      }
    },
    title: {
      useHTML: true,
      align: 'left',
      style: {
        color: Colors.WHITE
      }
    },
    navigator: {
      enabled: true,
      series: {
        lineColor: Colors.BLUE800,
        fillColor: Colors.TRANSPARENT
      },
      maskFill: Colors.TRANSPARENT
    },
    navigation: {
      menuStyle: {
        backgroundColor: Colors.GRAY700
      },
      menuItemStyle: {
        color: Colors.WHITE,
        backgroundColor: Colors.GRAY700,
        fontFamily: 'sans-serif'
      },
      menuItemHoverStyle: {
        backgroundColor: Colors.BLUE800
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          theme: {
            fill: Colors.GRAY700
          }
        }
      }
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,
      labelStyle: {
        display: 'none'
      },
      inputEnabled: false,
      buttonTheme: {
        width: 40,
        fill: Colors.GRAY700,
        style: {
          color: Colors.WHITE
        }
      },
      buttonPosition: {
        align: 'left',
        x: -20
      },
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1H'
        },
        {
          type: 'day',
          count: 1,
          text: '1D'
        },
        {
          type: 'week',
          count: 1,
          text: '1W'
        },
        {
          type: 'month',
          count: 1,
          text: '1M'
        }
      ]
    },
    tooltip: {
      backgroundColor: Colors.GRAY800,
      borderColor: Colors.BLUE800,
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
      gridLineWidth: 1
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
        type: 'hollowcandlestick'
      }
    ]
  };

  constructor() {}
}
