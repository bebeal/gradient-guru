# DataGrid

Right now this will simply be a wrapper around the [ag-Grid](https://www.ag-grid.com/) library. This will allow us to have a powerful and flexible grid component that can be used in a variety of ways. Written in a manner to easily add other powerful but not natively supported features to the grid.

## Installation

- Use whole packages for now since its easier, but can reduce scope later and just pull in the modules actually used

```tsx
yarn add ag-grid-community ag-grid-react ag-grid-enterprise ag-grid-charts-enterprise
```

## Setup

```tsx
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
```

### Enterprise Setup

Simply import the AG Grid Enterprise package in your application before any grid instance is created.

```tsx
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise'
// eslint-disable-next-line disable linter for the giant line with the license key
LicenseManager.setLicenseKey("LICENSE")
```

### Custom Themes

```tsx
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

<div class="ag-theme-quartz">
  <AgGridReact rowData={...} columnDefs={...} />
</div>
```

### Good Defaults

- **Debug Mode**: Logs extra details to the consol for every property which has changed. Ths is a good way to diagnose if you are causing the grid to update on each render
- **Percentage Based Grid Sizes**: Grid will fill to fit the entire container its placed in. **Important**: Make sure the container you are putting the grid into also has height specified, as the browser will fit the div according to a percentage of the parents height, and if the parent has no height, then this % will always be zero. https://ag-grid.com/react-data-grid/grid-size/

```tsx
const isDevEnv = process.env.NODE_ENV === 'development'

...
<div className="ag-theme-quartz">
  <AgGridReact
    debug={isDevEnv}
    style={{ width: '100%', height: '100%' }}
  />
 </div>
```

### Core Options

#### Row Models

- 4 Total Row Models: Client-Side, Server-Side, Infinite, Viewport
- Client Side Row Models:
  - **Client-Side**: The grid will load all of the data into the grid in one go. (think users browser side)
- Server Side Row Models:
  - **Infinite**:
    - *Primitive lazy-loading*: Data is loaded in blocks from the server and the grid will ask for more data when the user scrolls to the end.
    - Use this if you want to display a large, flat (not grouped) list of data.
  - **Server-Side**: Builds on the Infinite Row Model
    - *Primitive lazy-loading*
    - *Grouped Lazy-Loading*: lazy-loading of grouped data with server-side grouping and aggregation.
    - Use for more advanced use cases where users will need to do ad-hoc slice and dice of data with server-side aggregations.
  - **Viewport**:
    - *Viewport Only Load*: Grid will inform the server exactly what data it is displaying (first and last row) and the server will provide data for exactly those rows only.
    - Use this if you want the server to know exactly what the user is viewing
    - Useful for updates in very large live datastreams where the server only sends updates to clients viewing the impacted rows. (think stock market data)

#### Custom Components

- **Cell** Component: To customise the contents of a cell.
- **Header** Component: To customise the header of a column and column groups.
- **Edit** Component: To customise the editing of a cell.
- **Filter** Component: For custom column filter that appears inside the column menu.
- **Floating Filter** Component: For custom column floating filter that appears inside the column menu.
- **Date** Component: To customise the date selection component in the date filter.
- **Loading** Component: To customise the loading cell row when using Server Side row model.
- **Overlay** Component: To customise loading and no rows overlay components.
- **Status Bar** Component: For custom status bar components.
- **Tool Panel** Component: For custom tool panel components.
- **Tooltip** Component: For custom cell tooltip components.

### Tips

---

#### React Hooks

- For function or callback properties use `useCallback`
- For all properties that are Objects, e.g. `colDefs`, `rowData`, or `sidebar`, use `useState`.
  - You can get away with only using `useMemo` if the object is static
  - Otherwise the grid will be given a new instance of the object on each render, which can result in unexpected behaviour
- For Event Listeners there is no requirement to use useCallback as event handlers do not trigger updates within the grid.

---

## References

- https://ag-grid.com/react-data-grid/react-hooks
