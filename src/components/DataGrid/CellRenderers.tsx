import { CustomCellRendererProps } from 'ag-grid-react';

import { CountryCodes } from '@/utils/CountryCodes';

export interface CellRendererParams extends CustomCellRendererProps {
  isFilterRenderer?: boolean;
}

export const flagRenderer = (params: CellRendererParams) => {
  return <img width="15" height="10" src={`https://flags.fmcdn.net/data/flags/mini/${CountryCodes[params.value]}.png`} alt={`${params.value} flag`} />;
};

export const ratingRenderer = (params: CellRendererParams) => {
  const { value } = params;
  if (value === '(Select All)') {
    return value;
  } else if (params.isFilterRenderer && value === 0) {
    return '(No stars)';
  }

  return (
    <span>
      {[...Array(5)].map((x, i) => {
        return value > i ? <img className={''} key={i} src="../images/star.svg" alt={`${value} stars`} width="12" height="12" /> : null;
      })}
    </span>
  );
};

export const booleanCellRenderer = (params: CellRendererParams) => {
  if (params?.value === true) {
    return <span title="true" className="ag-icon ag-icon-tick content-icon" />;
  }
  if (params?.value === false) {
    return <span title="false" className="ag-icon ag-icon-cross content-icon" />;
  }
  if (params.isFilterRenderer) {
    if (params.value === '(Select All)') {
      return params.value;
    }
    return '(empty)';
  } else {
    return null;
  }
};

export const cellRenderers = {};
