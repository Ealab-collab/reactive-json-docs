# setAttributeValue

> **Alternative**: For post-render DOM modification, see the [SetAttributeValue action](../action/Attribute/SetAttributeValue.md).

Dynamically sets or modifies the value of an HTML attribute before rendering. This attribute transformer allows you to conditionally modify attributes based on data state during the evaluation phase.

## Basic Syntax

```yaml
attributeTransforms:
  # Add CSS class (string mode)
  - what: setAttributeValue
    name: "class"
    value: "active"
    
  # Replace attribute value (string mode)
  - what: setAttributeValue
    name: "data-status"
    mode: "replace"
    value: ~.currentStatus
    
  # Merge style object (object mode)
  - what: setAttributeValue
    name: "style"
    value:
      borderColor: "#3b82f6"
      backgroundColor: "var(--bs-secondary-bg-subtle, rgba(0, 0, 0, 0.05))"
```

## Properties

- **name** *(string, required)*: The name of the attribute to modify.
- **mode** *(string, optional)*: The modification mode. Default: `"append"`.
  - `"append"`: Adds the value to the existing attribute value (space-separated for strings, merges properties for objects).
  - `"replace"`: Completely replaces the existing attribute value.
- **value** *(string | object, required)*: The value to set or append. Supports template evaluation (e.g., `~.dynamicValue`, `~~.globalValue`).
  - **String mode**: When `value` is a string, operates in string mode for simple attributes like `class`, `data-*`, etc.
  - **Object mode**: When `value` is an object, operates in object mode for complex attributes like `style`. In append mode, merges properties property by property.
- **preventDuplicateValues** *(boolean, optional)*: When `true` (default), prevents duplicate values when using append mode (applies to string mode and string properties in object mode).
- **separator** *(string, optional)*: The separator used between values in string mode. Default: `" "` (space).

## Behavior

The transformer operates in two distinct modes based on the `value` type:

### String Mode (when `value` is a string)

- **Append mode**: Adds the new value to the existing attribute, separated by the specified separator.
- **Replace mode**: Completely overwrites the existing attribute value.
- **Duplicate prevention**: In append mode, prevents adding duplicate values when enabled.

### Object Mode (when `value` is an object)

- **Replace mode**: Completely replaces the entire object attribute.
- **Append mode**: Merges properties property by property:
  - Starts from the current object attribute
  - For each property in `value`, applies the same logic as string mode:
    - If both current and new values are strings: appends them (respecting `preventDuplicateValues`)
    - Otherwise: replaces the property with the new value (new value has precedence)
  - Handles nested objects recursively
  - Works on a copy to avoid mutation issues

### Undefined Values

- **Append mode**: `undefined` values are ignored, keeping the current attribute unchanged.
- **Replace mode**: `undefined` is assigned to the attribute.

## Common Use Cases

- **Dynamic CSS classes**: Adding/removing CSS classes based on state (string mode).
- **Data attributes**: Setting data-* attributes for JavaScript integration (string mode).
- **ARIA attributes**: Dynamically updating accessibility attributes (string mode).
- **Style attributes**: Modifying inline styles conditionally (object mode). Merge style properties without losing existing ones.

## Examples

### String Mode Example

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
        backgroundColor: "var(--bs-secondary-bg-subtle, rgba(0, 0, 0, 0.05))"
        color: "#212529"
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

### Object Mode Example (Style Merging)

```yaml
renderView:
  - type: div
    attributes:
      style:
        padding: "20px"
        borderWidth: "2px"
        borderStyle: "solid"
        borderColor: "#007bff #007bff"
        borderRadius: "4px"
        backgroundColor: "var(--bs-secondary-bg-subtle, rgba(0, 0, 0, 0.05))"
        color: "#212529"
    attributeTransforms:
      # Merge additional style properties without losing existing ones
      - what: setAttributeValue
        name: "style"
        value:
          borderColor: "#007bff var(--bs-primary, #3b82f6)"
        when: ~.isHighlighted
        is: true
    # Result when isHighlighted is true:
    # The modification changes the highlight color for vertical borders (left and right)
    # borderColor becomes: "#007bff var(--bs-primary, #3b82f6)"
    # (horizontal borders stay #007bff, vertical borders change to primary color)

data:
  isHighlighted: false
```

### Object Mode Replace Example

```yaml
renderView:
  - type: div
    attributes:
      style:
        padding: "10px"
        border: "2px solid #007bff"
        backgroundColor: "var(--bs-secondary-bg-subtle, rgba(0, 0, 0, 0.05))"
        color: "#212529"
    attributeTransforms:
      # Completely replace the style object
      - what: setAttributeValue
        name: "style"
        mode: "replace"
        value:
          backgroundColor: "var(--bs-primary-bg-subtle, #d4f0ec)"
          color: "var(--bs-primary-text-emphasis, #2b6b5a)"
          padding: "15px"
          borderRadius: "8px"
          border: "2px solid var(--bs-primary, #44a08d)"
    # Result:
    # style: {
    #   backgroundColor: "var(--bs-primary-bg-subtle, #d4f0ec)",
    #   color: "var(--bs-primary-text-emphasis, #2b6b5a)",
    #   padding: "15px",
    #   borderRadius: "8px",
    #   border: "2px solid var(--bs-primary, #44a08d)"
    # }
    # (original styles are completely replaced)
```

## Notes

- **Pre-render execution**: This transformer modifies attributes before the component renders, ensuring child components receive the transformed attributes.
- **Mode detection**: The transformer automatically detects whether to use string mode or object mode based on the `value` type after template evaluation.
- **Append mode behavior**: 
  - **String mode**: Respects existing attribute values, adding new values separated by the specified separator.
  - **Object mode**: Merges properties property by property, applying string append logic where both values are strings, otherwise replacing with the new value.
- **Replace mode**: Use when you need complete control over the attribute value. In object mode, completely replaces the entire object.
- **Duplicate prevention**: Only applies to append mode, and works for string values in both string mode and object mode.
- **Object merging**: In object mode append, nested objects are merged recursively. Properties that don't match the expected format for append are replaced (new value has precedence).
- **Extended properties vs shorthand**: When transformations are required, prefer using extended CSS properties (e.g., `borderWidth`, `borderStyle`, `borderColor`) instead of shorthand properties (e.g., `border`). This ensures the browser handles property modifications correctly. When you modify a single property like `borderColor` on an element that uses the shorthand `border`, the browser may decompose the shorthand into individual properties, which can lead to unexpected behavior. Using extended properties from the start avoids this issue.
- **Template evaluation**: The value property supports full template evaluation including `~.localData`, `~~.globalData`, `~>nearestKey`, and `~~>globalKey` patterns.
- **Conditional execution**: Supports the same condition system as actions (`when`, `is`, `isEmpty`, `isNotEmpty`, etc.).
- **Undefined handling**: `undefined` values are ignored in append mode but assigned in replace mode.
