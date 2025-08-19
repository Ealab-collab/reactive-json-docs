# UnsetAttributeValue

Removes a specific value from an HTML attribute while preserving other values.

## Basic Syntax

```yaml
actions:
  # Remove CSS class
  - what: unsetAttributeValue
    name: "class"
    value: "highlighted"
    
  # Remove with template
  - what: unsetAttributeValue
    name: "data-tags"
    value: ~.tagToRemove
```

## Properties

- **name** *(string, required)*: The name of the attribute to modify.
- **separator** *(string, optional)*: The separator used between values. Default: `" "` (space).
- **unsetAllOccurrences** *(boolean, optional)*: When `true` (default), removes all occurrences of the value from the attribute. When `false`, removes the number of elements defined by `unsetCount`.
- **unsetCount** *(number, optional)*: Specifies the number of objects to remove. Supports template evaluation and is cast to integer. When `0`, removes nothing. When `1` or more, removes the specified number of elements starting from the beginning of the string. When `-1` or less, removes the specified number of elements starting from the end of the string. When undefined or invalid, defaults to removing all occurrences (equivalent to `unsetAllOccurrences: true`).
- **value** *(string, required)*: The value to remove from the attribute. Supports template evaluation (e.g., `~.dynamicValue`, `~~.globalValue`). Automatically converted to string if not already.

## Behavior

- **Selective removal**: Removes only the specified value from the attribute.
- **Occurrence control**: Removes all occurrences by default, or only the first when configured.
- **Count control**: When `unsetCount` is specified, controls the exact number of elements to remove and the direction (from beginning or end).
- **Preservation**: Other values in the attribute remain intact.

## Logic Reference

### Behavior Matrix

| `unsetAllOccurrences` | `unsetCount` | Behavior | Notes |
|:---------------------:|:------------:|:---------|:------|
| `true` | *ignored* | **Removes ALL occurrences** | `unsetCount` is completely ignored |
| `false` | `1` | Removes **1 occurrence** from beginning | Default behavior when `unsetCount` is valid |
| `false` | `2` | Removes **2 occurrences** from beginning | |
| `false` | `-1` | Removes **1 occurrence** from end | |
| `false` | `-2` | Removes **2 occurrences** from end | |
| `false` | `0` | **Removes nothing** | |
| `false` | `undefined` | **Removes ALL occurrences** | Fallback to "all" behavior |
| `false` | `null` | **Removes ALL occurrences** | Fallback to "all" behavior |
| `false` | `"invalid"` | **Removes ALL occurrences** | Fallback to "all" behavior |
| `undefined` | `1` | Removes **1 occurrence** from beginning | `unsetAllOccurrences` defaults to `true`, but valid `unsetCount` applies |
| `undefined` | `-1` | Removes **1 occurrence** from end | |
| `undefined` | `0` | **Removes nothing** | |
| `undefined` | `undefined` | **Removes ALL occurrences** | Complete default behavior |

### Logic Summary

1. **If `unsetAllOccurrences: true`** → removes ALL, ignores `unsetCount`
2. **If `unsetAllOccurrences: false` AND `unsetCount` valid** → uses `unsetCount`
3. **If `unsetCount` invalid/undefined** → fallback to "remove ALL" even if `unsetAllOccurrences: false`
4. **If nothing is defined** → default behavior = "remove ALL"

This logic ensures there is always a defined behavior, with an intelligent fallback to "remove all" when parameters are invalid.

## Common Use Cases

- **CSS class removal**: Removing specific CSS classes while keeping others.
- **Data attribute cleanup**: Removing specific values from space-separated data attributes.
- **Conditional styling**: Removing styling classes based on state changes.

## Example

```yaml
renderView:
  - type: button
    content: "Remove 'highlighted' class"
    actions:
      - what: setData
        on: click
        path: ~.removeHighlight
        value: true
        stopPropagation: true

  - type: button
    content: "Reset"
    actions:
      - what: setData
        on: click
        path: ~.removeHighlight
        value: false
        stopPropagation: true

  - type: input
    attributes:
      type: "text"
      value: "This input has multiple classes..."
      class: "uav-readonly uav-highlighted"
      readonly: "readonly"
      style:
        padding: "10px"
        border: "2px solid #007bff"
        borderRadius: "4px"
        fontSize: "16px"
        margin: "10px 0"
        width: "300px"
        display: "block"
    actions:
      - what: unsetAttributeValue
        name: "class"
        value: "uav-highlighted"
        when: ~.removeHighlight
        is: true

  - type: style
    content: |
      .uav-readonly {
        cursor: not-allowed !important;
        opacity: 0.7 !important;
      }
      .uav-highlighted {
        border-color: #ffc107 !important;
        outline: 2px solid #ffc107 !important;
        outline-offset: 2px !important;
      }

data:
  removeHighlight: false
```

## Notes

- Only removes exact matches of the specified value.
- Maintains the integrity of other attribute values.
- Works with any space-separated attribute values.
- Safe to use even if the value doesn't exist in the attribute.
- The value property supports full template evaluation including `~.localData`, `~~.globalData`, `~>nearestKey`, and `~~>globalKey` patterns.
