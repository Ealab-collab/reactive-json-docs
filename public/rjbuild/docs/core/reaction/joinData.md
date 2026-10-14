# Reaction: joinData

The `joinData` reaction writes a string built from several parts at a location: a URL that depends on the data, a label, a key. YAML has no string concatenation; `joinData` fills this gap.

## Properties

- `path` (string, required): The location receiving the string (template syntax).
- `parts` (array, required): The parts of the string, in the format of the `src` of `additionalDataSource` (see [Dynamic URLs with `src` as Array](../../getting-started/rjbuild-structure.md#dynamic-urls-with-src-as-array)):
  - a literal string;
  - a template reference (`~.slug`, `~~.id`, `~>item.id`), evaluated in the current template context;
  - `{segment, required}`: a reference used as a path part;
  - `{param, value, required}`: a query parameter, appended after the path (`?key=value`, or `&key=value` when the path already has a query string).

## Behavior

- An empty reference adds an empty string.
- An empty `required` segment or parameter cancels the write: the location keeps its value. Mark the parts that must never be missing as required, to avoid writing a truncated URL.
- A non-required parameter whose key or value is empty is omitted.

## Example

### Build the URL of the chosen entity, then submit to it

```yaml
renderView:
  - type: button
    content: "Link"
    actions:
      - what: joinData
        on: click
        path: ~~.saveUrl
        parts:
          - "/api/save?bundle=company&id="
          - segment: ~~.selectedId
            required: true
      - what: submitData
        on: click
        url: ~~.saveUrl
        data:
          parent: ~~.parentId

data:
  selectedId: 42
  parentId: 7
```

`fetchData`, `submitData` and `redirectNow` also accept the parts directly in `url` / `to`, and URL attributes (`href`, `src`...) accept them too: use `joinData` when the composed string must be stored, or shown.

## Limitations

- The parts are joined as they are: path parts are not URL-encoded (only parameters are).
