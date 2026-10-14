# Reaction: collectField

The `collectField` reaction writes the values of one field of every item of a collection, as an array. Typical use: a "select all" checkbox that writes the identifiers of the listed items.

## Properties

- `from` (string, required): The collection (template syntax), an array of objects.
- `field` (string, required): The name of the field to read in each item. It is evaluated.
- `path` (string, required): The location receiving the array (template syntax).

## Behavior

- The array of the `field` values is written at `path`, in the order of the collection.
- The items that are not objects, and the items whose field is `null`, `undefined` or an empty string, are skipped.
- A collection that is not an array writes an empty array.
- The collection is read from the complete data, even inside a `DataFilter`.

## Example

### Select all / deselect all

```yaml
renderView:
  - type: button
    content: "Select all"
    actions:
      - what: collectField
        on: click
        from: ~~.results
        field: nid
        path: ~~.selection
  - type: button
    content: "Deselect all"
    actions:
      - what: setData
        on: click
        path: ~~.selection
        value: []

data:
  results:
    - nid: 4
      title: "First"
    - nid: 9
      title: "Second"
  selection: []
```

## Limitations

- Only a direct field of the items is read (no nested path such as `author.id`).
