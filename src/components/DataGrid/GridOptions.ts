import { GridOptions } from 'ag-grid-community';

const suppressColumnMoveAnimation = () => false;
const ssr = typeof window === 'undefined';
const isSmall = false;
export const gridOptions: GridOptions = {
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', key: 'totalAndFilter', align: 'left' },
      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent', align: 'right' },
    ],
  },
  components: {},
  defaultColDef: {
    minWidth: 50,
    editable: true,
    filter: true,
    floatingFilter: !isSmall,
    enableCellChangeFlash: true,
  },
  rowDragManaged: true,
  rowDragMultiRow: true,
  popupParent: ssr ? null : (document.querySelector('#example-wrapper') as HTMLElement),
  rowGroupPanelShow: isSmall ? undefined : 'always',
  pivotPanelShow: 'always',
  suppressColumnMoveAnimation: suppressColumnMoveAnimation(),
  enableRtl: ssr ? false : /[?&]rtl=true/.test(window?.location?.search || ''),
  enableCharts: true,
  enableRangeSelection: true,
  enableFillHandle: true,
  undoRedoCellEditing: true,
  undoRedoCellEditingLimit: 50,
  suppressClearOnFillReduction: false,
  rowSelection: 'multiple',
  quickFilterText: undefined,
  groupSelectsChildren: true,
  suppressRowClickSelection: true,
  sideBar: {
    toolPanels: ['columns', 'filters'],
    position: 'right',
    defaultToolPanel: 'columns',
    hiddenByDefault: isSmall,
  },
  columnMenu: 'new',
  getBusinessKeyForNode: (node) => (node.data ? node.data.name : ''),
  initialGroupOrderComparator: ({ nodeA, nodeB }) => {
    if (nodeA?.key && nodeB?.key) {
      if (nodeA?.key < nodeB?.key) {
        return -1;
      }
      if (nodeA.key > nodeB.key) {
        return 1;
      }
    }
    return 0;
  },
  onGridReady: (event) => {
    if (!ssr && document.documentElement.clientWidth <= 1024) {
      event.api.closeToolPanel();
    }
  },
  excelStyles: [
    {
      id: 'v-align',
      alignment: {
        vertical: 'Center',
      },
    },
    {
      id: 'alphabet',
      alignment: {
        vertical: 'Center',
      },
    },
    {
      id: 'good-score',
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      interior: {
        color: '#C6EFCE',
        pattern: 'Solid',
      },
      numberFormat: {
        format: '[$$-409]#,##0',
      },
    },
    {
      id: 'bad-score',
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      interior: {
        color: '#FFC7CE',
        pattern: 'Solid',
      },
      numberFormat: {
        format: '[$$-409]#,##0',
      },
    },
    {
      id: 'header',
      font: {
        color: '#44546A',
        size: 16,
      },
      interior: {
        color: '#F2F2F2',
        pattern: 'Solid',
      },
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      borders: {
        borderTop: {
          lineStyle: 'Continuous',
          weight: 0,
          color: '#8EA9DB',
        },
        borderRight: {
          lineStyle: 'Continuous',
          weight: 0,
          color: '#8EA9DB',
        },
        borderBottom: {
          lineStyle: 'Continuous',
          weight: 0,
          color: '#8EA9DB',
        },
        borderLeft: {
          lineStyle: 'Continuous',
          weight: 0,
          color: '#8EA9DB',
        },
      },
    },
    {
      id: 'currency-cell',
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      numberFormat: {
        format: '[$$-409]#,##0',
      },
    },
    {
      id: 'boolean-type',
      dataType: 'Boolean',
      alignment: {
        vertical: 'Center',
      },
    },
    {
      id: 'country-cell',
      alignment: {
        indent: 4,
      },
    },
  ],
};
