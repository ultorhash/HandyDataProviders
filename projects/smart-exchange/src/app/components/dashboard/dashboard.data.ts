import { CellClassParams, ColDef, ValueFormatterParams } from "ag-grid-community";
import { IPriceTable } from "../../interfaces";

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
