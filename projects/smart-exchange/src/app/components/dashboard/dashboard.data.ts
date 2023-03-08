import { CellClassParams, ColDef, GridOptions, ValueFormatterParams } from "ag-grid-community";
import { GridsterItem } from "angular-gridster2";
import { IPriceTable } from "../../interfaces";
import { Cards } from "./dashboard.enum";

export const columnDefs: ColDef<IPriceTable>[] = [
  {
    headerName: 'Symbol',
    field: 'symbol',
    cellRenderer: (params: ValueFormatterParams<IPriceTable, string>) => {
      return `
        <div class="cell__value-image">
          <img src=${params.data?.image} alt=${params.value}>
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
  rowHeight: 30
};

export const dashboard: GridsterItem[] = [
  {
    id: Cards.Options,
    cols: 10,
    rows: 1,
    y: 0,
    x: 0,
    dragEnabled: false,
    resizeEnabled: false
  },
  {
    id: Cards.Chart,
    cols: 7,
    rows: 10,
    y: 0,
    x: 0
  },
  {
    id: Cards.PriceTable,
    cols: 3,
    rows: 10,
    y: 0,
    x: 0
  }
]