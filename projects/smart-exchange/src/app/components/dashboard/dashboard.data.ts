import {
  CellClassParams,
  ColDef,
  GridOptions,
  ValueFormatterParams
} from "ag-grid-community";
import { GridsterConfig } from "angular-gridster2";
import { IPriceTable } from "../../interfaces";
import { CoinStats } from "../../types";
import { unionToArray } from "../../utils";
import { Cards } from "./dashboard.enum";
import { ExtendedGridsterItem } from "./dashboard.interface";

export const columnDefs: ColDef<IPriceTable>[] = [
  {
    headerName: 'Symbol',
    field: 'symbol',
    cellRenderer: (params: ValueFormatterParams<IPriceTable, string>) => {
      return `
        <div class=cell__value-image>
          <img
            src=${params.data?.image}
            alt=${params.value}
          />
          ${params.value}
        </div>
      `;
    }
  },
  {
    headerName: 'Price',
    field: 'price'
  },
  {
    headerName: 'Change',
    field: 'change',
    cellClass: (params: CellClassParams<IPriceTable, number>) => {
      return params.value > 0
        ? 'cell__value-positive'
        : params.value < 0
          ? 'cell__value-negative'
          : '';
    }
  },
  {
    headerName: 'Change %',
    field: 'percentageChange',
    cellClass: (params: CellClassParams<IPriceTable, number>) => {
      return params.value > 0
        ? 'cell__value-positive'
        : params.value < 0
          ? 'cell__value-negative'
          : '';
    },
    valueFormatter: (params: ValueFormatterParams<IPriceTable>) => {
      return `${params.data!.percentageChange.toFixed(2)}%`;
    }
  }
];

export const defaultColDef: ColDef = {
  sortable: true,
  flex: 100
};

export const gridOptions: GridOptions = {
  rowHeight: 30,
  suppressScrollOnNewData: true
};

export const gridsterOptions: GridsterConfig = {
  resizable: {
    enabled: true
  },
  draggable: {
    enabled: true,
    ignoreContentClass: 'card-content',
  },
  gridType: 'fit',
  displayGrid: 'always'
};

export const dashboard: ExtendedGridsterItem[] = [
  {
    id: Cards.Options,
    cols: 10,
    rows: 1,
    y: 0,
    x: 0,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.Chart,
    cols: 7,
    rows: 10,
    y: 1,
    x: 0,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.PriceTable,
    cols: 3,
    rows: 6,
    y: 1,
    x: 7,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.Summary,
    cols: 3,
    rows: 4,
    y: 7,
    x: 7,
    dragEnabled: true,
    resizeEnabled: true
  }
];

export const coinStatsNames = unionToArray<keyof CoinStats>()(
  'marketCapRank',
  'marketCap',
  'circulatingSupply',
  'totalSupply',
  'totalVolume'
);
