import { Suspense, useRef, useState } from 'react';
import { Loading } from '@/components/Primitives/Loading';
import { isDebugMode } from '@/utils/environment';
import { LicenseManager } from 'ag-grid-charts-enterprise';
import { AgGridReact } from 'ag-grid-react';
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
  const [columnDefs, setColumnDefs] = useState(columnNames.map((name) => ({ headerName: name, field: name })));

  return (
    <Suspense fallback={<Loading>Loading Grid</Loading>}>
      <div className="ag-theme-quartz-auto-dark w-full h-full">
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} debug={isDebugMode()} className="w-full h-full" />
      </div>
    </Suspense>
  );
};
