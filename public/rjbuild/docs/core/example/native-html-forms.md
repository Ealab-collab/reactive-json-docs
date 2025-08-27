# Native HTML Forms

This guide explains how to use native HTML form elements (`input`, `select`, `textarea`) with Reactive-JSON's reaction system to create interactive forms with proper data synchronization.

## Core Concept: Reactions for Data Synchronization

Native HTML elements require explicit **reactions** to synchronize user input with your data. This is done using the `setData` reaction triggered by user events.

### Basic Structure

```yaml
- type: input
  attributes:
    type: "text"
    value: ~.fieldName           # Display current data value
  actions:
    - what: setData              # Reaction to update data
      on: input                  # Event that triggers the reaction
      path: ~.fieldName          # Data path to update
      value: "<reactive-json:event-new-value>"  # Value from the event
```

## Event Value Patterns

### Forward Update Pattern (Recommended)

Use `<reactive-json:event-new-value>` for automatic value detection:

- **Auto-detects the correct property**: `event.target.value` for inputs, `event.target.checked` for checkboxes
- **Simplifies configuration**: No need to specify which property to access
- **Works for all form elements**: text, number, checkbox, select, textarea, etc.

### Alternative Explicit Syntax

For specific control, you can explicitly access event properties:

- `<reactive-json:event>.target.value` - Direct access to input value
- `<reactive-json:event>.target.checked` - Direct access to checkbox state
- `<reactive-json:event>.target.selectedIndex` - Access to select index

## Event Types for Different Use Cases

- **`on: input`** - Real-time updates as user types (immediate feedback)
- **`on: change`** - Updates when user commits the change (varies by element type):
  - Text inputs: when value changes AND field loses focus
  - Checkboxes/Radio: immediately when checked/unchecked
  - Select: immediately when option is selected
- **`on: blur`** - Updates when user leaves the field (regardless of value change)
- **`on: focus`** - Triggered when user enters the field

## Common Patterns

### Label Association

Use the `for` attribute to associate labels with form elements for accessibility:

```yaml
- type: label
  attributes:
    for: "username-field"
  content: "Username:"
- type: input
  attributes:
    id: "username-field"
    type: "text"
    value: ~.username
  actions:
    - what: setData
      on: input
      path: ~.username
      value: "<reactive-json:event-new-value>"
```

**Note**: Reactive-JSON automatically converts the HTML `for` attribute to React's `htmlFor` property.

### Text Input
```yaml
- type: input
  attributes:
    type: "text"
    value: ~.fieldName
  actions:
    - what: setData
      on: input
      path: ~.fieldName
      value: "<reactive-json:event-new-value>"
```

### Checkbox
```yaml
- type: input
  attributes:
    type: "checkbox"
    checked: ~.isSelected
  actions:
    - what: setData
      on: change
      path: ~.isSelected
      value: "<reactive-json:event-new-value>"
```

### Select Dropdown
```yaml
- type: select
  attributes:
    value: ~.selectedOption
  content:
    - type: option
      attributes:
        value: "option1"
      content: "Option 1"
  actions:
    - what: setData
      on: change
      path: ~.selectedOption
      value: "<reactive-json:event-new-value>"
```

### Textarea
```yaml
- type: textarea
  attributes:
    value: ~.description
    placeholder: "Enter description..."
    rows: 4
  actions:
    - what: setData
      on: input
      path: ~.description
      value: "<reactive-json:event-new-value>"
```

### Number Input
```yaml
- type: input
  attributes:
    type: "number"
    value: ~.quantity
    min: 0
    max: 100
  actions:
    - what: setData
      on: input
      path: ~.quantity
      value: "<reactive-json:event-new-value>"
```

### Radio Buttons
```yaml
- type: input
  attributes:
    type: "radio"
    name: "size"
    value: "small"
    checked: ~.selectedSize
  actions:
    - what: setData
      on: change
      path: ~.selectedSize
      value: "small"

- type: input
  attributes:
    type: "radio"
    name: "size"
    value: "large"
    checked: ~.selectedSize
  actions:
    - what: setData
      on: change
      path: ~.selectedSize
      value: "large"
```

## Advanced Patterns

### Form Validation with Conditional Actions
```yaml
- type: input
  attributes:
    type: "email"
    value: ~.email
  actions:
    - what: setData
      on: input
      path: ~.email
      value: "<reactive-json:event-new-value>"
    - what: setData
      on: blur
      path: ~.emailValid
      value: "<reactive-json:event>.target.validity.valid"
```

### Multiple Field Updates
```yaml
- type: input
  attributes:
    type: "text"
    value: ~.firstName
  actions:
    - what: setData
      on: input
      path: ~.firstName
      value: "<reactive-json:event-new-value>"
    - what: setData
      on: input
      path: ~.fullName
      value: ["<reactive-json:event-new-value>", " ", ~.lastName]
```

## Simplification Alternatives

For simpler configuration and built-in styling, consider using pre-built form components:

- **Reactive-JSON Bootstrap**: `TextField`, `SelectField`, `CheckBoxField`, etc. with automatic data synchronization
- **Custom component libraries**: Create your own reusable form components with embedded reactions

Example with Bootstrap components:
```yaml
# Simpler alternative using reactive-json-bootstrap
- type: TextField
  label: "Username:"
  dataLocation: ~.username  # Automatic synchronization

# Equivalent native implementation
- type: label
  content: "Username:"
- type: input
  attributes:
    type: "text"
    value: ~.username
  actions:
    - what: setData
      on: input
      path: ~.username
      value: "<reactive-json:event-new-value>"
```

## Best Practices

1. **Always include `setData` reactions** for interactive elements
2. **Choose appropriate events**: `input` for real-time updates, `change` for committed changes
3. **Use `<reactive-json:event-new-value>`** for automatic value detection
4. **Consider pre-built components** for complex forms to reduce configuration
5. **Test data flow** to ensure changes are properly synchronized
