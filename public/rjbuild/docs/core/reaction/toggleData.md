# Reaction: toggleData

The `toggleData` reaction adds a value to an array when it is absent, and removes it when it is present. The other values of the array are kept. It is the building block of on/off filters and of data-driven selections (tags, recipients, checked rows).

## Properties

- `path` (string, required): The location of the array (template syntax).
- `value` (any, required): The value to add or remove. It is evaluated, so it can be a literal or a template reference.

## Behavior

- The value is appended when it is absent from the array, and removed when it is present. The order of the other values is kept.
- A missing location, or a location that does not hold an array, counts as an empty array: the result is always an array.
- The values are compared as strings: a numeric identifier (`12`) matches its text form (`"12"`).
- Nothing happens when the value is `null`, `undefined` or an empty string, such as a value coming from a data source that is not loaded yet. The array never receives an empty value.
- The current array is read from the complete data, even inside a `DataFilter`.

## Examples

### Filter toggle

```yaml
renderView:
  - type: button
    content: "My tasks"
    actions:
      - what: toggleData
        on: click
        path: ~~.filters.assignee
        value: ~~.currentUser.id

data:
  currentUser:
    id: 12
  filters:
    assignee: []
```

### One toggle per list item

```yaml
renderView:
  - type: Switch
    content: ~~.rows
    singleOption:
      load: row

templates:
  row:
    type: button
    content: ~.title
    actions:
      - what: toggleData
        on: click
        path: ~~.selection
        value: ~.id

data:
  rows:
    - id: 1
      title: "First"
    - id: 2
      title: "Second"
  selection: []
```

To show the state of each item, use `attributeTransforms` with a `contains` condition on the array (see [CheckBoxField](../element/form/CheckBoxField.md#data-driven-checkbox-lists)).

## Limitations

- Only arrays of scalar values are supported: objects are compared by their string form.
- `addData` appends without checking duplicates, and `removeData` removes by path: use `toggleData` to add or remove a known value.
