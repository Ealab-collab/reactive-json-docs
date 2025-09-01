# unsetAttribute

Completely removes an HTML attribute from an element before rendering. This attribute transformer allows you to conditionally remove entire attributes based on data state during the evaluation phase.

## Basic Syntax

```yaml
attributeTransforms:
  # Remove entire attribute
  - what: unsetAttribute
    name: "class"
    
  # Conditional removal
  - what: unsetAttribute
    name: "style"
    when: ~.useDefaultStyling
    is: true
```

## Properties

- **name** *(string, required)*: The name of the attribute to remove completely.

## Behavior

- **Complete removal**: Removes the entire attribute and all its values from the DOM element.
- **Attribute deletion**: The attribute is completely deleted, not just emptied.
- **Irreversible**: Once removed, the attribute must be explicitly set again to restore it.

## Common Use Cases

- **Conditional attribute presence**: Removing attributes entirely based on conditions.
- **Accessibility cleanup**: Removing ARIA attributes when not needed.
- **Data attribute management**: Completely removing data-* attributes.
- **Style reset**: Removing inline style attributes to fall back to CSS.

## Example

```yaml
renderView:
  - type: button
    content: "Toggle editable state"
    actions:
      - what: setData
        on: click
        path: ~.makeEditable
        value: true
        when: ~.makeEditable
        is: false
        stopPropagation: true
      - what: setData
        on: click
        path: ~.makeEditable
        value: false
        when: ~.makeEditable
        is: true
        stopPropagation: true

  - type: input
    attributes:
      type: "text"
      value: ~.input_value
      placeholder: "Input field with conditional readonly..."
      class: "demo-input"
      readonly: "readonly"
      style:
        padding: "10px"
        border: "2px solid #007bff"
        borderRadius: "4px"
        fontSize: "16px"
        margin: "10px 0"
        width: "300px"
        display: "block"
    attributeTransforms:
      - what: unsetAttribute
        name: "readonly"
        when: ~.makeEditable
        is: true
    actions:
      - what: setData
        on: change
        path: ~.input_value
        value: <reactive-json:event-new-value>

  - type: div
    content: ["Editable: ", ~.makeEditable, ", Value: ", ~.input_value]

  - type: style
    content: |
      .demo-input[readonly] {
        cursor: not-allowed !important;
        opacity: 0.7 !important;
        border-color: #6c757d !important;
      }
      .demo-input:not([readonly]) {
        border-color: #28a745 !important;
        outline: 2px solid #28a745 !important;
        outline-offset: 2px !important;
      }

data:
  makeEditable: false
  input_value: ""
```

## Notes

- **Pre-render execution**: This transformer removes attributes before the component renders, ensuring child components receive the transformed attributes.
- **Complete removal**: This transformer **completely removes the entire attribute**, not just specific values.
- **Alternative transformers**: Use `unsetAttributeValue` if you only want to remove specific values.
- **Restoration**: The attribute can be restored using `setAttributeValue` if needed.
- **Empty attributes**: To set an empty attribute (not remove it), use `setAttributeValue` with an empty string value.
- **Use case**: Useful for conditional attribute presence rather than conditional values.
- **Conditional execution**: Supports the same condition system as actions (`when`, `is`, `isEmpty`, `isNotEmpty`, etc.).
