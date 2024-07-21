'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { LicenseManager } from 'ag-grid-charts-enterprise';
import { ColDef, ColGroupDef, createGrid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createColumnDefs, Erroring, Loading } from '@/components';
import { isDebugMode, isDevEnv } from '@/utils';
import { columnTypes } from './Columns';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './grid-theme.css';

LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY || '');

export interface DataGridProps {
  data: any;
  columnNames: string[];
}

export const DataGrid = (props: DataGridProps) => {
  const { data, columnNames, ...rest } = props;
  const gridRef = useRef(null);
  const [rowData, setData] = useState(data);
  const [columnDefs, setColumnDefs] = useState(createColumnDefs(columnNames));
  const [gridOptions, setGridOptions] = useState<GridOptions>({
    columnTypes,
  });

  return (
    <Suspense fallback={<Loading>Loading Grid</Loading>}>
      <div className="ag-theme-quartz-auto-dark w-full h-full">
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} gridOptions={gridOptions} debug={isDebugMode()} className="w-full h-full" />
      </div>
    </Suspense>
  );
};
