# AutocompleteField

The `AutocompleteField` component provides a search-as-you-type input that fetches suggestions from a remote API as the user types. It supports single and multiple value selection, and customizable dropdown and selected-item templates.

## Basic Syntax

```yaml
- type: AutocompleteField
  dataLocation: ~~.selectedId
  placeholder: "Search…"
  src:
    - "/api/items"
    - param: "search"
      value: "<reactive-json:autocomplete-field:input>"
    - param: "limit"
      value: "10"
```

## Properties

- `dataLocation` (string, required): Path where the selected value (or array of values in multiple mode) is stored in the data context.
- `src` (array, required): URL segments used to build the API endpoint, using the same format as `additionalDataSource.src`. The special token `<reactive-json:autocomplete-field:input>` is replaced by the current search text at request time.
- `placeholder` (string, optional): Placeholder text for the search input.
- `minChars` (number, optional): Minimum number of characters required before a search is triggered. Defaults to `2`.
- `debounce` (number, optional): Delay in milliseconds between the last keystroke and the API request. Defaults to `300`.
- `multiple` (boolean, optional): Enable multiple selection mode. Selected values are stored as an array. Defaults to `false`.
- `maxItems` (number, optional): Maximum number of items that can be selected in multiple mode. No limit by default.
- `clearOnSelect` (boolean, optional): Clear the search input and close the dropdown after an item is selected. Defaults to `true`.
- `itemTemplate` (rjbuild, optional): Template used to render each item in the dropdown. Has access to item data via `~.` (e.g., `~.label`, `~.value`). Defaults to a `div` displaying `~.label`.
- `selectedTemplate` (rjbuild, optional): Template used to render the selected item (single mode) or each tag (multiple mode). Has access to item data via `~.`. Defaults to a `span` displaying `~.label`.
- `defaultFieldValue` (any, optional): Default value used when no data is present at `dataLocation`.
- `attributes` (object, optional): Attributes applied to the root container `div`. Also receives the CSS class `rj-autocomplete` automatically.
- `actions` (array, optional): Actions to execute based on component state.

## Backend Response Format

The endpoint must return a JSON array of objects. Each object must have at minimum a `value` and a `label` key:

```json
[
  { "value": 42, "label": "First result" },
  { "value": 7,  "label": "Second result" }
]
```

Additional keys can be included and are available in `itemTemplate` / `selectedTemplate` via `~.fieldName`.

## The Input Token

The string `<reactive-json:autocomplete-field:input>` is a special token that can be placed anywhere in the `src` segments (as a `value`, `param`, or URL segment). It is replaced at request time with the current text in the search field.

```yaml
src:
  - "/api/search"
  - param: "q"
    value: "<reactive-json:autocomplete-field:input>"
```

## CSS Classes

The component uses the following CSS classes for styling:

- `.rj-autocomplete` — root container
- `.rj-autocomplete__input` — the search text input
- `.rj-autocomplete__dropdown` — the suggestions dropdown
- `.rj-autocomplete__item` — each suggestion item
- `.rj-autocomplete__item.is-selected` — a suggestion that is already selected (multiple mode)
- `.rj-autocomplete__selected` — the selected-item area (single mode)
- `.rj-autocomplete__clear` — the clear button (single mode)
- `.rj-autocomplete__tag` — a selected tag (multiple mode)
- `.rj-autocomplete__tag-remove` — the remove button on a tag
- `.rj-autocomplete__loading` — the loading indicator

## Examples

### Single value selection

Stores a single selected value. Shows a clear button once an item is selected.

```yaml
renderView:
  - type: AutocompleteField
    dataLocation: ~~.selectedId
    placeholder: "Search…"
    src:
      - "/api/items"
      - param: "search"
        value: "<reactive-json:autocomplete-field:input>"
      - param: "limit"
        value: "10"

data:
  selectedId: null
```

### Multiple selection with a limit

Stores up to 3 values as an array. Each selected item is displayed as a removable tag.

```yaml
renderView:
  - type: AutocompleteField
    dataLocation: ~~.selectedIds
    multiple: true
    maxItems: 3
    placeholder: "Add items (max 3)…"
    src:
      - "/api/items"
      - param: "search"
        value: "<reactive-json:autocomplete-field:input>"
      - param: "limit"
        value: "10"
  - type: p
    content:
      - "Selected IDs: "
      - type: Join
        content: ~~.selectedIds

data:
  selectedIds: []
```

### Custom templates

Use `itemTemplate` and `selectedTemplate` to render richer content. Both templates have access to all fields returned by the backend via `~.`.

```yaml
- type: AutocompleteField
  dataLocation: ~~.selectedItem
  placeholder: "Search…"
  src:
    - "/api/items"
    - param: "search"
      value: "<reactive-json:autocomplete-field:input>"
  itemTemplate:
    type: div
    content:
      - type: strong
        content: ~.label
      - " (#"
      - ~.value
      - ")"
  selectedTemplate:
    type: span
    content:
      - ~.label
      - " ✓"
```

### Keep search text after selection

Set `clearOnSelect: false` to keep the typed text and dropdown open after selecting an item (useful in multiple mode when selecting several items quickly).

```yaml
- type: AutocompleteField
  dataLocation: ~~.selectedIds
  multiple: true
  clearOnSelect: false
  placeholder: "Search…"
  src: [...]
```

## Limitations

- Requires an external API endpoint; no built-in static options support.
- The dropdown only renders while the user is actively typing (results are not re-fetched on re-open without re-typing).
- In multiple mode, selected items' display data is kept in local React state and may be lost on page reload unless persisted separately.
- Styling must be provided via external CSS targeting the `.rj-autocomplete*` classes, or via `attributes.style`.
- No built-in keyboard navigation for the dropdown.
