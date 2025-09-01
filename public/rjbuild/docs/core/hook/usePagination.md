# usePagination

Creates customizable pagination systems with configurable components and advanced navigation logic.

## Hook Signature

```javascript
const {
    firstShownItemIndex,
    getPageCountForContent,
    maxShownItemIndexExcluded,
    PageControls,
    pageMaxItemCount,
    sliceVisibleContent,
} = usePagination({
    customComponents = {},
    containerProps = {},
    dataToPaginate = [],
    forcePaginationDisplay = false,
    itemProps = {},
    maxPageButtonsCount = 5,
    pageMaxItemCount = 10,
})
```

## Parameters

- `customComponents` (object, optional): Custom components to override defaults
  - `Container`: Pagination container component
  - `First`: First page button
  - `Prev`: Previous page button  
  - `Item`: Numbered page button
  - `Ellipsis`: Hidden pages indicator ("...")
  - `Next`: Next page button
  - `Last`: Last page button
- `containerProps` (object, optional): Additional props passed to container component
- `dataToPaginate` (array, optional): Complete data to paginate (used for page count calculation)
- `forcePaginationDisplay` (boolean, optional): Force pagination display even with less than 2 pages
- `itemProps` (object, optional): Additional props passed to page buttons
- `maxPageButtonsCount` (number, optional): Maximum number of page buttons to display (default: 5)
- `pageMaxItemCount` (number, optional): Maximum items per page (default: 10)

## Return Values

- `firstShownItemIndex` (number): Index of first item displayed for active page (for `slice()`)
- `getPageCountForContent` (function): Function to calculate page count for given content
- `maxShownItemIndexExcluded` (number): Exclusive index of last displayed item (for `slice()`)
- `PageControls` (function): React component containing pagination controls
- `pageMaxItemCount` (number): Maximum items per page (same as parameter)
- `sliceVisibleContent` (function): Function to slice array according to active page

## Component Override System

The `usePagination` hook uses a sophisticated component override system that allows you to customize pagination appearance and behavior at three different levels.

### Resolution Priority

The hook resolves components using this priority order:

1. **Custom Components** (highest priority): Components passed via `customComponents` parameter
2. **Plugin Components** (medium priority): Components from `globalDataContext.plugins.pagination`
3. **Default Components** (fallback): Built-in components with basic styling

```javascript
const PaginationContainer = customComponents.Container ?? pluginComponents.Container ?? DefaultPaginationContainer;
const PaginationFirst = customComponents.First ?? pluginComponents.First ?? DefaultPaginationFirst;
const PaginationPrev = customComponents.Prev ?? pluginComponents.Prev ?? DefaultPaginationPrev;
const PaginationItem = customComponents.Item ?? pluginComponents.Item ?? DefaultPaginationItem;
const PaginationEllipsis = customComponents.Ellipsis ?? pluginComponents.Ellipsis ?? DefaultPaginationEllipsis;
const PaginationNext = customComponents.Next ?? pluginComponents.Next ?? DefaultPaginationNext;
const PaginationLast = customComponents.Last ?? pluginComponents.Last ?? DefaultPaginationLast;
```

### Available Component Slots

Each component receives specific props automatically from the hook:

#### Container
```javascript
// Props: { children, ...containerProps }
Container: ({ children, ...props }) => <nav {...props}>{children}</nav>
```
- **Purpose**: Wraps the entire pagination
- **Receives**: All children components and `containerProps` from hook parameters

#### First & Last
```javascript
// Props: { disabled, onClick, children, ...props }
First: ({ disabled, onClick, children, ...props }) => (
    <button disabled={disabled} onClick={onClick} {...props}>
        {children ?? "«"}
    </button>
)
```
- **Purpose**: Navigate to first/last page
- **Receives**: `disabled` (boolean), `onClick` handler, optional `children` content

#### Prev & Next  
```javascript
// Props: { disabled, onClick, children, ...props }
Prev: ({ disabled, onClick, children, ...props }) => (
    <button disabled={disabled} onClick={onClick} {...props}>
        {children ?? "‹"}
    </button>
)
```
- **Purpose**: Navigate to previous/next page
- **Receives**: `disabled` (boolean), `onClick` handler, optional `children` content

#### Item (Page Numbers)
```javascript
// Props: { active, disabled, onClick, children, ...itemProps }
Item: ({ active, disabled, onClick, children, ...props }) => (
    <button 
        disabled={disabled} 
        onClick={onClick} 
        aria-current={active ? "page" : undefined}
        {...props}
    >
        {children} {/* Page number */}
    </button>
)
```
- **Purpose**: Individual page number buttons
- **Receives**: `active` (boolean), `disabled`, `onClick`, `children` (page number), `itemProps`

#### Ellipsis
```javascript
// Props: { children, ...props }
Ellipsis: ({ children, ...props }) => (
    <span {...props}>{children ?? "…"}</span>
)
```
- **Purpose**: Indicates hidden pages
- **Receives**: Optional `children` content (defaults to "…")

### Override Scenarios

#### 1. Custom Components (Per-Hook Override)
```javascript
const { PageControls } = usePagination({
    customComponents: {
        // Override specific components for this hook instance
        Item: ({ active, disabled, onClick, children, ...props }) => (
            <button 
                className={`my-page-btn ${active ? 'active' : ''}`}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                Page {children}
            </button>
        )
    }
});
```

#### 2. Plugin Components (Global Override)
```javascript
// In your plugin configuration
const myPaginationPlugin = {
    pagination: {
        // These components will be used by ALL usePagination hooks
        Container: MyCustomContainer,
        Item: MyCustomPageButton,
        Next: MyCustomNextButton
    }
};

const plugins = mergeComponentCollections([myPaginationPlugin]);
```

#### 3. Mixed Override Strategy
```javascript
// Plugin provides base customization
const plugins = mergeComponentCollections([bootstrapPaginationPlugin]);

// Specific hook overrides just the container
const { PageControls } = usePagination({
    customComponents: {
        Container: ({ children, ...props }) => (
            <nav className="special-nav" {...props}>
                <div className="custom-wrapper">{children}</div>
            </nav>
        )
        // Item, Prev, Next, etc. will use plugin components
    }
});
```

## Page Button Logic

The hook uses intelligent logic for button display:

- **Pages 1, 2, 3**: `[1,2,3,4,5]`
- **Page 4**: `[2,3,4,5,6]`
- **Page 5**: `[3,4,5,6,7]`
- **Final pages**: `[6,7,8,9,10]`

Smart ellipses (`...`) appear automatically when pages are hidden between visible buttons and extremes.

## Example Usage

```jsx
import { usePagination } from '@ea-lab/reactive-json';

const MyPaginatedList = ({ items }) => {
    const {
        PageControls,
        sliceVisibleContent,
    } = usePagination({
        dataToPaginate: items,
        pageMaxItemCount: 20,
        maxPageButtonsCount: 7,
        customComponents: {
            Container: ({ children, ...props }) => (
                <nav className="custom-pagination" {...props}>
                    <div className="pagination-wrapper">{children}</div>
                </nav>
            ),
            Item: ({ active, disabled, onClick, children, ...props }) => (
                <button
                    className={`custom-page-btn ${active ? 'active' : ''}`}
                    disabled={disabled}
                    onClick={onClick}
                    {...props}
                >
                    {children}
                </button>
            ),
            Prev: ({ disabled, onClick, children, ...props }) => (
                <button
                    className="custom-prev-btn"
                    disabled={disabled}
                    onClick={onClick}
                    {...props}
                >
                    {children ?? 'Previous'}
                </button>
            )
        }
    });

    const visibleItems = sliceVisibleContent(items);

    return (
        <div>
            <div className="items-list">
                {visibleItems.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
            <PageControls />
        </div>
    );
};
```

## Plugin Integration

```javascript
// Plugin with custom pagination components
const paginationPlugin = {
    pagination: {
        Container: BootstrapPaginationContainer,
        Item: BootstrapPaginationItem,
        Next: BootstrapPaginationNext,
        Prev: BootstrapPaginationPrev,
    }
};

// Hook will automatically use these components
const plugins = mergeComponentCollections([paginationPlugin]);
```

## Performance Notes

- Hook maintains active page state internally
- Page calculations optimized to avoid unnecessary re-calculations
- `sliceVisibleContent` useful for complete in-memory collections
- For very large collections, prefer server-side pagination

## Known Limitations

- Pagination doesn't automatically update when data filters change (`currentData`)
- Future version: support for synchronization with external data changes
