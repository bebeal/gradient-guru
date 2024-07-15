import { ValueFormatterParams } from "ag-grid-community";

export const toPercentage = (value: any, precision?: number) => `${parseFloat(value).toFixed(precision)}%`;

export const toTime = (value: any, showMs: boolean = false): string => {
    const date = new Date(value);
    const hour = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    const sec = date.getSeconds().toString().padStart(2, '0');
    const ms = date.getMilliseconds().toString().padStart(3, '0');

    return showMs ? `${hour}:${min}:${sec}:${ms}` : `${hour}:${min}:${sec}`;
};

export const toCurrency = ({
    value=0,
    locale = 'en-US', // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
    currency = 'USD', // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
    maximumFractionDigits = 2, //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
}) => {
    const numberFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits,
    });
    return numberFormatter.format(value);
};

export const formatThousands = (value: string | number) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const currencyFormatter = (params: any) => {
  if (params.value == null) {
      return '';
  }
  if (isNaN(params.value)) {
      return 'NaN';
  }
  // if we are doing 'count', then we do not show pound sign
  if (params?.node?.group && params?.column?.aggFunc === 'count') {
      return params.value;
  }
  let result = '$' + formatThousands(Math.floor(Math.abs(params.value)));
  if (params.value < 0) {
      result = '(' + result + ')';
  }
  return result;
};
