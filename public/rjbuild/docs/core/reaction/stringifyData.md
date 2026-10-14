# Reaction: stringifyData

The `stringifyData` reaction writes the JSON representation of a value (`JSON.stringify`) at a location. Use it to send structured data (an array, an object) to an endpoint that expects a text field.

## Properties

- `from` (string, required): The value to serialize (template syntax).
- `path` (string, required): The location receiving the JSON string (template syntax).

## Behavior

- The JSON string is written synchronously, in the order of the actions list. Placed before a `submitData` of the same event, it guarantees that the submitted data holds the fresh JSON.
- An undefined value writes an empty string.
- The value is read from the complete data, even inside a `DataFilter`.

## Example

### Save a layout as JSON

```yaml
renderView:
  - type: button
    content: "Save"
    actions:
      - what: stringifyData
        on: click
        from: ~~.dashboard.widgets
        path: ~~.dashboard.payload.layout
      - what: submitData
        on: click
        url: "/api/dashboard/save"
        data:
          layout: ~~.dashboard.payload.layout

data:
  dashboard:
    widgets:
      - id: "sales"
        width: 2
    payload: {}
```

## Limitations

- The JSON is compact (no indentation).
