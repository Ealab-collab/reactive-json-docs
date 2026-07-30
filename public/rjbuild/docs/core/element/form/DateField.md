# DateField

The `DateField` component is a thin convenience wrapper around [`Input`](Input.md) that renders an HTML `date` input (`<input type="date">`). It inherits every `Input` option (label, wrapper, attributes, actions, data binding) and adds an optional `storageFormat` for binding to a fixed-format storage string.

## Basic Syntax

```yaml
- type: DateField
  dataLocation: ~.startDate
  label: "Start date:"
```

By default the raw value of the HTML `date` input (`YYYY-MM-DD`) is stored as-is — identical to any other `Input` wrapper.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context. Without it, the value is stored in the template context under the component's `datafield`.
- `defaultFieldValue` (string, optional): Default value when no data is present.
- `label` (string or View props, optional): Field label text (supports template evaluation and View rendering). A wrapper `<div>` is added automatically when a label is present.
- `storageFormat` (string, optional): Binds the field to a fixed-format **storage string** instead of the raw input value. Accepts `"date"` or `"datetime"` (see [Storage format](#storage-format)). When omitted, the raw `YYYY-MM-DD` value is stored unchanged (original behavior).
- `attributes` (object, optional): Attributes applied to the wrapper `<div>` (or to the input itself when there is no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to the `<input>` element (e.g. `class`, `id`, `min`, `max`).
- `labelAttributes` (object, optional): Attributes applied to the label (`htmlFor` is managed automatically).
- `forceWrapper` (boolean, optional): Forces the presence (`true`) or absence (`false`) of the wrapper `<div>`. If omitted, the wrapper appears only when a label is present.
- `actions` (array, optional): Actions and conditional reactions to execute based on field state.

## Storage format

An HTML `date` input can only read and write `YYYY-MM-DD`. Backends often store dates in a fixed, stricter format — for example Drupal datetime fields validate against `Y-m-d` (date-only field) or `Y-m-d\TH:i:s` (datetime field). Feeding such a value straight to a `date` input leaves it blank (the input rejects a value carrying a time), and writing back `YYYY-MM-DD` is rejected by a datetime field.

Set `storageFormat` to bridge the two. It applies **two conversions**:

- **On read** — only the date part of the stored value is shown, so a datetime value like `2016-11-29T23:00:00` displays as `2016-11-29` instead of leaving the input empty.
- **On write** — the value is re-serialized to the target storage format:
  - `storageFormat: date` → `YYYY-MM-DD`
  - `storageFormat: datetime` → `YYYY-MM-DDT00:00:00` (the time is anchored at midnight, since a `date` input carries no time)

An empty input stores an empty string (clears the field). When `storageFormat` is omitted, no conversion happens and the raw input value is stored — so existing usages are unaffected.

> For editing a value that also carries a **time** the user should see and change, use [`DateTimeField`](DateTimeField.md) instead.

## Examples

### Default behavior (raw `YYYY-MM-DD`)

```yaml
renderView:
  - type: DateField
    dataLocation: ~.startDate
    label: "Start date:"
  - type: div
    content:
      - type: strong
        content: "Stored value: "
      - ~.startDate

data:
  startDate: "2027-03-15"
```

### `storageFormat: datetime`

The `date` input drives a datetime storage string (time anchored at midnight):

```yaml
renderView:
  - type: DateField
    dataLocation: ~.closeDate
    label: "Close date:"
    storageFormat: datetime
  - type: div
    content:
      - type: strong
        content: "Stored value: "
      - ~.closeDate

data:
  closeDate: "2016-11-29T23:00:00"
```
