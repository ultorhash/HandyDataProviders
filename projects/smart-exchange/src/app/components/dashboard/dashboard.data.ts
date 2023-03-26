import {
  CellClassParams,
  ColDef,
  GetQuickFilterTextParams,
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
    headerName: 'symbol',
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
    },
    getQuickFilterText: (params: GetQuickFilterTextParams<IPriceTable, string>) => {
      return params.value;
    }
  },
  {
    headerName: 'price',
    field: 'price'
  },
  {
    headerName: 'change',
    field: 'change',
    cellClass: (params: CellClassParams<IPriceTable, number>) => {
      return params.value > 0
        ? 'value-positive'
        : params.value < 0
          ? 'value-negative'
          : 'value-neutral';
    }
  },
  {
    headerName: 'change %',
    field: 'percentageChange',
    cellClass: (params: CellClassParams<IPriceTable, number>) => {
      return params.value > 0
        ? 'value-positive'
        : params.value < 0
          ? 'value-negative'
          : 'value-neutral';
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
  displayGrid: 'always',
  swap: true
};

export const dashboard: ExtendedGridsterItem[] = [
  {
    id: Cards.Options,
    cols: 32,
    rows: 2,
    x: 0,
    y: 0,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.Chart,
    cols: 22,
    rows: 16,
    x: 0,
    y: 2,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.PriceTable,
    cols: 10,
    rows: 10,
    x: 22,
    y: 2,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Cards.Summary,
    cols: 10,
    rows: 6,
    x: 22,
    y: 12,
    dragEnabled: true,
    resizeEnabled: true
  }
];

export const coinStatsNames = unionToArray<keyof CoinStats>()(
  'marketCapRank',
  'marketCap',
  'circulatingSupply',
  'totalSupply',
  'totalVolume',
  'maxSupply',
  'ath',
  'atl'
);
