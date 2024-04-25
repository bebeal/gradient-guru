import { currencyFormatter } from './Formatters';
import { ValueParserParams } from 'ag-grid-community';

const currencyDataType = {
  currency: {
    extendsDataType: 'number',
    baseDataType: 'number',
    valueFormatter: currencyFormatter,
    valueParser: (params: ValueParserParams) => {
      if (params.newValue == null) {
        return null;
      }
      let newValue = String(params.newValue)?.trim?.();
      if (newValue === '') {
        return null;
      }
      newValue = newValue.replace('$', '').replace(',', '');
      if (newValue.includes('(')) {
        newValue = newValue.replace('(', '').replace(')', '');
        newValue = '-' + newValue;
      }
      return Number(newValue);
    },
    columnTypes: ['currency', 'numeric'],
  },
};

const currencyColumnType = {
  useValueFormatterForExport: false,
  // useValueParserForImport: false,
  valueFormatter: currencyFormatter,
};

export const columns = {};
