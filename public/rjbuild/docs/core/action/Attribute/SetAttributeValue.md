# SetAttributeValue

Dynamically sets or modifies the value of an HTML attribute on an element.

## Basic Syntax

```yaml
actions:
  # Add CSS class
  - what: setAttributeValue
    name: "class"
    value: "active"
    
  # Replace attribute value
  - what: setAttributeValue
    name: "data-status"
    mode: "replace"
    value: ~.currentStatus
```

## Properties

- **name** *(string, required)*: The name of the attribute to modify.
- **mode** *(string, optional)*: The modification mode. Default: `"append"`.
  - `"append"`: Adds the value to the existing attribute value (space-separated).
  - `"replace"`: Completely replaces the existing attribute value.
- **value** *(string, required)*: The value to set or append. Supports template evaluation (e.g., `~.dynamicValue`, `~~.globalValue`). Automatically converted to string if not already. Special characters are handled safely.
- **preventDuplicateValues** *(boolean, optional)*: When `true` (default), prevents duplicate values when using append mode.
- **separator** *(string, optional)*: The separator used between values. Default: `" "` (space).

## Behavior

- **Append mode**: Adds the new value to the existing attribute, separated by the specified separator.
- **Replace mode**: Completely overwrites the existing attribute value.
- **Duplicate prevention**: In append mode, prevents adding duplicate values when enabled.

## Common Use Cases

- **Dynamic CSS classes**: Adding/removing CSS classes based on state.
- **Data attributes**: Setting data-* attributes for JavaScript integration.
- **ARIA attributes**: Dynamically updating accessibility attributes.
- **Style attributes**: Modifying inline styles conditionally.

## Example

```yaml
renderView:
  - type: input
    attributes:
      type: "text"
      placeholder: "Start typing to see the highlighting..."
      class: "sav-demo-input"
      value: ~.input_data
      style:
        padding: "10px"
        border: "2px solid #007bff"
        borderRadius: "4px"
        fontSize: "16px"
        margin: "10px 0"
        width: "300px"
        display: "block"
    actions:
      - what: setData
        on: change
        path: ~.input_data
        value: <reactive-json:event-new-value>
      - what: setAttributeValue
        name: "class"
        value: "sav-highlighted"
        when: ~.input_data
        isNotEmpty:

  - type: div
    content: ~.input_data

  - type: style
    content: |
      .sav-highlighted {
        border-color: #28a745 !important;
        outline: 2px solid #28a745 !important;
        outline-offset: 2px !important;
      }

data:
  input_data: ""
```

## Notes

- The action respects existing attribute values when using append mode.
- Use replace mode when you need complete control over the attribute value.
- Duplicate prevention only applies to append mode.
- The value property supports full template evaluation including `~.localData`, `~~.globalData`, `~>nearestKey`, and `~~>globalKey` patterns.
