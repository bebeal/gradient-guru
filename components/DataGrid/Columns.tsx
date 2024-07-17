import { ValueParserParams } from "ag-grid-community";
import { currencyFormatter } from "./Formatters";
import { booleanCellRenderer, flagRenderer, pokemonTypesRenderer, ratingRenderer } from "./CellRenderers";
import { pokemonTypeOrder } from "../Primitives/Icons/IconSets/PokemonTypes";

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
}

const currencyColumnType = {
  useValueFormatterForExport: false,
  // useValueParserForImport: false,
  valueFormatter: currencyFormatter,
}

const pokemonTypeComparator = (typeA: string, typeB: string) => {
  if (typeA === '' || typeB === '') {
    return typeA.localeCompare(typeB); // Empty types go to the end
  }
  const indexA = pokemonTypeOrder.indexOf(typeA);
  const indexB = pokemonTypeOrder.indexOf(typeB);
  
  if (indexA === -1 && indexB === -1) {
    return typeA.localeCompare(typeB); // If neither type is in the list, sort alphabetically
  } else if (indexA === -1) {
    return 1; // Unknown types go to the end
  } else if (indexB === -1) {
    return -1; // Unknown types go to the end
  }
  
  return indexA - indexB;
}

export const columnTypes = {
  rating: {
    cellRenderer: ratingRenderer,
  },
  flag: {
    cellRenderer: flagRenderer,
  },
  boolean: {
    cellRenderer: booleanCellRenderer
  },
  pokemonType: {
    cellRenderer: pokemonTypesRenderer,
    comparator: (typesA: string, typesB: string) => {
      const typesAArray = typesA.toLocaleLowerCase().split(', ');
      const typesBArray = typesB.toLocaleLowerCase().split(', ');
      if (typesAArray.length === typesBArray.length) {
        for (let i = 0; i < typesAArray.length; i++) {
          const comparison = pokemonTypeComparator(typesAArray[i], typesBArray[i]);
          if (comparison !== 0) {
            return comparison;
          }
        }
        return 0;
      }
      // more types > less types
      return typesAArray.length - typesBArray.length;
    },
  }
};

export const createColumnDefs = (columnNames: string[]) => {
  const autoAssignCellRenderer = (name: string) => {
    if (name.includes('Type')) {
      return 'pokemonType';
    }
    return undefined;
  }
  return columnNames.map((name) => ({ headerName: name, field: name, type: autoAssignCellRenderer(name) }))
}