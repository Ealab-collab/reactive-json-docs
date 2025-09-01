# setAttributeValue

> **Alternative**: For post-render DOM modification, see the [SetAttributeValue action](../action/Attribute/SetAttributeValue.md).

Dynamically sets or modifies the value of an HTML attribute before rendering. This attribute transformer allows you to conditionally modify attributes based on data state during the evaluation phase.

## Basic Syntax

```yaml
attributeTransforms:
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
      placeholder: "Type to see conditional styling..."
      class: "base-input"
      value: ~.input_data
      style:
        padding: "10px"
        border: "2px solid #007bff"
        borderRadius: "4px"
        fontSize: "16px"
        margin: "10px 0"
        width: "300px"
        display: "block"
    attributeTransforms:
      - what: setAttributeValue
        name: "class"
        value: "highlighted"
        when: ~.input_data
        isNotEmpty:
    actions:
      - what: setData
        on: change
        path: ~.input_data
        value: <reactive-json:event-new-value>

  - type: div
    content: ["Current value: ", ~.input_data]

  - type: style
    content: |
      .base-input {
        transition: border-color 0.3s ease;
      }
      .highlighted {
        border-color: #28a745 !important;
        outline: 2px solid #28a745 !important;
        outline-offset: 2px !important;
      }

data:
  input_data: ""
```

## Notes

- **Pre-render execution**: This transformer modifies attributes before the component renders, ensuring child components receive the transformed attributes.
- **Append mode behavior**: Respects existing attribute values when using append mode.
- **Replace mode**: Use when you need complete control over the attribute value.
- **Duplicate prevention**: Only applies to append mode.
- **Template evaluation**: The value property supports full template evaluation including `~.localData`, `~~.globalData`, `~>nearestKey`, and `~~>globalKey` patterns.
- **Conditional execution**: Supports the same condition system as actions (`when`, `is`, `isEmpty`, `isNotEmpty`, etc.).
