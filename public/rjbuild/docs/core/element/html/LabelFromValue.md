# LabelFromValue

The `LabelFromValue` component displays the **label** associated with a value, using an option-like structure as data source. It is the read-only counterpart of the form fields: the same `{label, value}` list feeding a [`SelectField`](../form/SelectField.md) or a [`CheckBoxField`](../form/CheckBoxField.md) can be reused to render the selected value as text.

## Basic Syntax

```yaml
- type: LabelFromValue
  dataLocation: ~.status
  options:
    - label: "Active"
      value: 1
    - label: "Inactive"
      value: 2
```

With `status: 2` in the data, this renders `Inactive`.

## Properties

- `dataLocation` (string, optional): Path to the value to resolve. Without it, the value is read from the template context under the component's `datafield`.
- `options` (array, optional): Array of `{label, value}` objects. Ignored when `dynamicOptions` is set.
- `dynamicOptions` (any, optional): Template reference resolving to the options array (e.g. `~~.allStages`, typically options loaded from a backend). Takes precedence over `options`.
- `defaultFieldValue` (any, optional): Value used when no data is present.
- `loose` (boolean, optional): Matches the options by `String()`-coerced equality instead of the default strict one (see [Loose matching](#loose-matching)). Omitted or `false` = strict equality (original behavior).
- `actions` (array, optional): Actions and conditional reactions to execute based on component state (hide, tooltip, …).

The label is rendered through the `View` engine, so it can be a plain string or a full component structure (`{type: strong, content: …}`).

## Loose matching

By default an option matches the current value only on **strict** equality (`===`), so `1` (number) and `"1"` (string) are two different values and no label is found.

This bites when the JS type of the same identifier is not guaranteed across sources. A typical case is a decoupled backend that renders an entity reference id as a **string** when reading the entity, but echoes it back as a **number** in its save response: the label is correct on load, then disappears right after a save — until a full reload restores the original type.

Set `loose: true` to compare the values as strings instead:

```yaml
- type: LabelFromValue
  dataLocation: ~.stage
  dynamicOptions: ~~.allStages
  loose: true
```

Nullish values are never coerced: an empty value (`null` / `undefined`) still matches nothing, so it cannot accidentally match an option whose value is the `"null"` string. `loose` is opt-in — omitted, the component behaves exactly as before, so existing usages are unaffected.

## Examples

### Display the label of a selected value

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.status
    label: "Status"
    options:
      - label: "Active"
        value: 1
      - label: "Inactive"
        value: 2
      - label: "Pending"
        value: 3
  - type: div
    content:
      - type: strong
        content: "Label: "
      - type: LabelFromValue
        dataLocation: ~.status
        options:
          - label: "Active"
            value: 1
          - label: "Inactive"
            value: 2
          - label: "Pending"
            value: 3

data:
  status: 3
```

Renders: `Label: Pending`.

### Options loaded from a backend, with loose matching

```yaml
renderView:
  - type: LabelFromValue
    dataLocation: ~~.deal.data.stage
    dynamicOptions: ~~.allStages
    loose: true

data:
  # allStages is typically fetched (additionalDataSource) as
  # [{label: "Discovery", value: "12"}, {label: "Negotiation", value: "13"}, …]
  deal:
    data:
      stage: 13
```

The value is a number while the option values are strings: without `loose`, nothing would be displayed.

### Inside a template, against global data

```yaml
templates:
  userCard:
    type: div
    content:
      - "Admin: "
      - type: LabelFromValue
        dataLocation: ~~.isAdmin
        options:
          - label: "Yes"
            value: true
          - label: "No"
            value: false

renderView:
  - load: userCard

data:
  isAdmin: true
```

## Notes

- The first matching option wins; the options list is not deduplicated.
- When no option matches the value (or the matched option carries no `label`), nothing is displayed — the value itself is not used as a fallback label.
- An empty value (`null`, `undefined`, `""`) therefore renders nothing, unless an option explicitly declares that value.

## Limitations

- No support for grouped options or nested option structures.
- No built-in formatting of the label (wrap the component if needed).
- Multi-value data (an array of values) is not supported: the whole array is compared to each option value.
